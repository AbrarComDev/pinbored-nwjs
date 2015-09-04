
/**
 * @ngdoc function
 * @name pinboredWebkitApp.controller:SearchableViewCtrl
 * @description
 * # SearchableViewCtrl
 * Controller of the pinboredWebkitApp
 */
angular.module('pinboredWebkitApp')
  .controller('SearchableViewCtrl', 
    ['$scope', '$timeout', '$filter', 'Usersessionservice', 'Utilservice', 'Appconfigservice', 
    'bmFulltextFilter', 'bmTagsFilter', 
    function ($scope, $timeout, $filter, Usersessionservice, Utilservice, Appconfigservice, 
      bmFulltextFilter, bmTagsFilter) {
    
    // shared searchable view model
    $scope.filter = {
      filterDelay : 750,
      textFilterTimeout : null,
      text : '',
      tags : []
    };

    // page model
    $scope.data = {
      isLoading : true,
      tagNames : [],
      items: [],
      filteredList : []
    };

    $scope.paging = {
      numPageButtons : 10,
      current : 1,
      total : 0
    };

    $scope.config = {
      collectionType : '',
      tagFilterType : false,
      tagFilterTypeText : 'inclusive / and',
      searchAllWords : false,
      searchAllWordsText : 'search all words',
      showSearch : false,
      showTags : false,
      showPager : false
    }

    $scope.checkMaxTags = function(amount) {
      if($scope.filter.tags.length > amount) {
        // remove tag, one too many
        $scope.filter.tags.splice($scope.filter.tags.indexOf($scope.filter.tags[$scope.filter.tags.length-1]), 1);
      }
    };

    // array return format: { text: 'Tag1' }, { text: 'Tag2' }, { text: 'Tag3' }, { text: 'Tag4' }
    // see: http://mbenford.github.io/ngTagsInput/gettingstarted under 'Autocomplete'
    $scope.loadTagItems = function(query) {
      // return filtered parent scope' tagNames with query (which is user input)
      return $filter('filter')($scope.data.tagNames, query) || [];
    };

    $scope.onSearchTagChanged = function () {
      $scope.checkMaxTags($scope.appconfig.maxTagSearch);
      $scope.updateFiltersPaging();
    };

    $scope.onFoldIntoTagChanged = function () {
      $scope.checkMaxTags(1);
    };

    $scope.onNewTagChanged = function () {
      $scope.checkMaxTags(1);
    };

    // this method is essentially a manual debounce for filtering.
    // debounce was apparently added in Angular 1.3 but why change
    // a winning team? naively thinking, most likely, Angular itself 
    // will use a similar approach anyway.

    $scope.updateFiltersPaging = function() {
      // if the textFilterPromise exists, cancel it:
      if($scope.filter.textFilterTimeout !== null) {
        $timeout.cancel($scope.filter.textFilterTimeout);
      }
      // create new $timeout promise to apply filters and update the paging
      $scope.filter.textFilterTimeout = $timeout(function() {
        $scope.applyFilters();
        $scope.updatePaging();
      }, $scope.filter.filterDelay);
    };

    $scope.updatePaging = function() {
      $scope.paging.total = Math.min($scope.data.items.length, $scope.data.filteredList.length);
      console.log('paging total: ' + $scope.paging.total);
    };

    $scope.applyFilters = function() {
      console.log('applying filters to list...');
      var word = $scope.filter.text;
      var tags = $scope.filter.tags;
      var logicType = ($scope.appconfig.tagFilterType === true) ? 'AND' : 'OR';
      switch($scope.config.collectionType) {
        case 'bookmarks':
          $scope.data.filteredList = bmFulltextFilter($scope.data.items, word);
          $scope.data.filteredList = bmTagsFilter($scope.data.filteredList, tags, logicType);
          break;
        case 'tags':
          // $scope.data.filteredList = fulltextFilter($scope.data.items, word);
          // $scope.data.filteredList = tagsFilter($scope.data.filteredList, tags, logicType);
          $scope.data.filteredList = $scope.data.items;
          break;
      }
    };

    $scope.$on('$viewContentLoaded', function() {
      console.info('searchable view controller $viewContentLoaded called');

      // bind mousetrap, can be overwritten in sub views
      Mousetrap.bind('mod+f', $scope.hotkeySearch);
      Mousetrap.bind('mod+t', $scope.hotkeySearchTag);
    });

    $scope.$on('$destroy', function() {
      console.info('searchable view controller $destroy called');

      // remove textFilterTimeout
      if ($scope.filter.textFilterTimeout !== null) {
        $timeout.cancel($scope.filter.textFilterTimeout);
        $scope.filter.textFilterTimeout = null;
      }

      // unbind mousetraps
      Mousetrap.unbind('mod+f');
      Mousetrap.unbind('mod+t');
    });

  }]);
