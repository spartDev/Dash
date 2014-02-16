/*  APP
---------------------------------------------------*/

(function () {

      window.app = {
        Views: {},
        Extensions: {},
        Router: null,

        init: function () {

          this.instance = new app.Views.App();
          Backbone.history.start();

        }
      };

      $(function() {
        window.app.init();
      });

      app.Router = Backbone.Router.extend({

        routes: {
          'info': 'info',
          'activity': 'activity',
          '': 'home'
        },

        home: function () {
          var view = new app.Views.Home();
          app.instance.goto(view);
        },

        activity: function () {
          var view = new app.Views.Activity();
          app.instance.goto(view);
        },

        info: function () {
          var view = new app.Views.Info();
          app.instance.goto(view);
        }

      });

      app.Extensions.View = Backbone.View.extend({

        initialize: function () {
          this.router = new app.Router();
        },

        render: function(options) {

          options = options || {};

          if (options.page === true) {
            this.$el.addClass('page');
          }

          return this;

        },

        transitionIn: function (callback) {

          var view = this,
              delay

          var transitionIn = function () {
            view.$el.addClass('is-visible');
            view.$el.on('transitionend', function () {
              if (_.isFunction(callback)) {
                callback();
              }
            })
          };

          _.delay(transitionIn, 20);

        },

        transitionOut: function (callback) {

          var view = this;

          view.$el.removeClass('is-visible');
          view.$el.on('transitionend', function () {
            if (_.isFunction(callback)) {
              callback();
            };
          });

        }

      });

      app.Views.App = app.Extensions.View.extend({

        el: 'body',

        goto: function (view) {

          var previous = this.currentPage || null;
          var next = view;

          if (previous) {
            previous.transitionOut(function () {
              previous.remove();
            });
          }

          next.render({ page: true });
          this.$el.append( next.$el );
          next.transitionIn();
          this.currentPage = next;

        }

      });

      app.Views.Home = app.Extensions.View.extend({

        className: 'home',

        events: {
                'click .carousel-prev' : 'prev',
                'click .carousel-next' : 'next'
        },

        initialize: function () {
            $('.main_navigation__item').removeClass('active_menu');
            $("#home").addClass('active_menu');
        },

        next: function() {
            $('.carousel__item', this.el).addClass('carousel__item--animate');
        },

        prev: function() {
            $('.carousel__item', this.el).removeClass('carousel__item--animate');
        },

        render: function () {
          var template = _.template($('script[name=home]').html());
          this.$el.html(template());
          return app.Extensions.View.prototype.render.apply(this, arguments);
        }

      });

      app.Views.Activity = app.Extensions.View.extend({

        className: 'activity',

         initialize: function () {
            $('.main_navigation__item').removeClass('active_menu');
            $("#activity").addClass('active_menu');
        },

        render: function () {
          var template = _.template($('script[name=activity]').html());
          this.$el.html(template());
          return app.Extensions.View.prototype.render.apply(this, arguments);
        }

      });

      app.Views.Info = app.Extensions.View.extend({

        className: 'info',

        initialize: function () {
            $('.main_navigation__item').removeClass('active_menu');
            $("#info").addClass('active_menu');
        },

        render: function () {
          var template = _.template($('script[name=info]').html());
          this.$el.html(template());
          return app.Extensions.View.prototype.render.apply(this, arguments);
        }

      });

    }());
