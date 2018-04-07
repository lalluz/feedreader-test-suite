$(function() {
    describe('RSS Feeds', function() {
        /* This test ensures that the allFeeds
         * variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the
         * allFeeds object and ensures that it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has URL', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the
         * allFeeds object and ensures that it has a name defined
         * and that the name is not empty.
         */
        it('each feed has name', function() {
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        var body = document.querySelector('body');

        /* This test ensures that the menu element is
         * hidden by default.
         */
        it('menu is hidden by default', function() {
            var isMenuHidden = body.classList.contains('menu-hidden');
            expect(isMenuHidden).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu toggles', function() {
            var menuIcon = document.querySelector('.icon-list');
            var isMenuHidden = body.classList.contains('menu-hidden');

            if (isMenuHidden === true){
                menuIcon.click();
                isMenuHidden = body.classList.contains('menu-hidden');
                expect(isMenuHidden).toBe(false);

                menuIcon.click();
                isMenuHidden = body.classList.contains('menu-hidden');
                expect(isMenuHidden).toBe(true);
            }
        });
    });

    describe('Initial Entries', function() {
        /* This test ensures that when the asynchronous loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('there is at least an entry in feed container', function(done) {
            var entry = document.querySelector('.feed').querySelector('.entry');
            expect(entry).toBeDefined();
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the asynchronous loadFeed function that the content actually changes.
         */
        var initialFeedSelection;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeedSelection = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it("content changes", function(done) {
          var newFeedSelection = document.querySelector(".feed").innerHTML;
          expect(initialFeedSelection).not.toBe(newFeedSelection);
          done();
        });
    });

}());
