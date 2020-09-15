define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var CharacterTextView = ComponentView.extend({

    preRender: function() {
      this.listenTo(Adapt, {
        "device:resize": this.resizeControl,
        "pageView:ready": this.setupInview
      });
    },

    postRender: function() {
      this.resizeImage(Adapt.device.screenSize);

      this.$('.bubble').css({
        'border': 'solid ' + this.model.get('_text')._borderWidth + 'px',
        'border-radius': this.model.get('_text')._cornerRadius + 'px'
      });

      if (this.model.get('_text')._color) {
        this.$('.bubble').css({
          'border-color': this.model.get('_text')._color,
          'color': this.model.get('_text')._color
        });
      }

      if (this.model.get('_text')._background) {
        this.$('.bubble').css('background-color', this.model.get('_text')._background);
      }

      this.resizeControl();
    },

    setupInview: function() {
      var selector = this.getInviewElementSelector();
      if (!selector) {
        this.setCompletionStatus();
        return;
      }

      this.setupInviewCompletion(selector);
    },

    /**
     * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
     */
    getInviewElementSelector: function() {
      if (this.$('.bubble').length > 0) return '.bubble';

      if (this.model.get('body')) return '.component__body';

      if (this.model.get('instruction')) return '.component__instruction';

      if (this.model.get('displayTitle')) return '.component__title';

      return null;
    },

    resizeControl: function() {
      this.resetStyles();

      if (Adapt.device.screenSize == 'small') {
        this.setupSmallSize();
      } else if (Adapt.device.screenSize == 'medium') {
        this.setupMediumSize();
      } else {
        this.setupLargeSize();
      }
      this.resizeImage(Adapt.device.screenSize);
    },

    setupLargeSize: function() {
      // Text
      this.$('.character-text__text').addClass('overlay');
      this.$('.character-text__text').css('width', this.model.get('_text')._width + '%');
      this.$('.character-text__text').css('top', this.model.get('_text')._top);
      this.$('.character-text__text').css('left', this.model.get('_text')._left + '%');
      this.$('.bubble').addClass('bubble-' + (this.model.get('_text')._location));
      // Graphic
      if (this.model.has('_graphic')) {
        if (this.model.get('_graphic')._location == "left") {
          this.$('.character-text__graphic').addClass('left');
        }
        if (this.model.get('_graphic')._location == "right") {
          this.$('.character-text__graphic').addClass('right');
        }
        if (this.model.get('_graphic')._location == "center") {
          this.$('.character-text__graphic').addClass('center');
        }
        if (this.$('.character-text__graphic img').attr('data-large') !== "") {
          this.$('.character-text__widget').addClass('image');
        }
      }
    },

    setupMediumSize: function() {
      this.$('.character-text__graphic').addClass('center');
      this.$('.bubble').addClass('bubble-bottom');
    },

    setupSmallSize: function() {
      this.$('.character-text__graphic').addClass('center');
      this.$('.bubble').addClass('bubble-bottom');
    },

    resetStyles: function() {
      // Text
      this.$('.character-text__text').removeClass('overlay');
      this.$('.character-text__text').css('width', 'auto');
      this.$('.character-text__text').css('top', 0);
      this.$('.character-text__text').css('left', 0);
      this.$('.bubble').removeClass('bubble-top');
      this.$('.bubble').removeClass('bubble-bottom');
      this.$('.bubble').removeClass('bubble-left');
      this.$('.bubble').removeClass('bubble-right');
      // Arrow
      this.$('.arrow').attr('style', '');
      this.$('.arrow-border').attr('style', '');
      // Graphic
      this.$('.character-text__graphic').removeClass('left');
      this.$('.character-text__graphic').removeClass('right');
      this.$('.character-text__graphic').removeClass('center');
      // Widget
      this.$('.character-text__widget').removeClass('image');
    },

    resizeImage: function(width) {
      // Arrow
      if (this.model.get('_text')._background) {
        this.$('.bubble-top').find('.arrow').css('border-top-color', this.model.get('_text')._background);
        this.$('.bubble-right').find('.arrow').css('border-right-color', this.model.get('_text')._background);
        this.$('.bubble-bottom').find('.arrow').css('border-bottom-color', this.model.get('_text')._background);
        this.$('.bubble-left').find('.arrow').css('border-left-color', this.model.get('_text')._background);
      }

      // Border
      if (this.model.get('_text')._borderWidth > 0) {
        this.$('.bubble-top').find('.arrow-border').css('border-top-color', this.model.get('_text')._color);
        this.$('.bubble-right').find('.arrow-border').css('border-right-color', this.model.get('_text')._color);
        this.$('.bubble-bottom').find('.arrow-border').css('border-bottom-color', this.model.get('_text')._color);
        this.$('.bubble-left').find('.arrow-border').css('border-left-color', this.model.get('_text')._color);

        // Position
        this.$('.bubble-top').find('.arrow-border').css({
          'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
          'bottom': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
          'margin-right': -(16 + this.model.get('_text')._borderWidth) + 'px'
        });

        this.$('.bubble-right').find('.arrow-border').css({
          'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
          'left': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
          'margin-top': -(16 + this.model.get('_text')._borderWidth) + 'px'
        });

        this.$('.bubble-bottom').find('.arrow-border').css({
          'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
          'top': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
          'margin-right': -(16 + this.model.get('_text')._borderWidth) + 'px'
        });

        this.$('.bubble-left').find('.arrow-border').css({
          'border-width': (16 + this.model.get('_text')._borderWidth) + 'px',
          'right': -((16 + this.model.get('_text')._borderWidth) * 2 + 1) + 'px',
          'margin-top': -(16 + this.model.get('_text')._borderWidth) + 'px'
        });

      } else {
        this.$('.bubble-top').find('.arrow-border').css('display', 'none');
      }

      var src = this.$('.character-text__graphic img').attr('data-' + width);
      this.$('.character-text__graphic img').attr('src', src);

      this.$('.character-text__graphic').imageready(_.bind(function() {
        this.setReadyStatus();
      }, this));
    }

  });

  return Adapt.register('character-text', {
    model: ComponentModel.extend({}), // create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: CharacterTextView
  });
});
