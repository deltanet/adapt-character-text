define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var CharacterText = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeControl);
            this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
        },

        postRender: function() {
            this.listenTo(this.model, 'change:_isComplete', this.removeInviewListener);
            this.resizeImage(Adapt.device.screenSize);

            // Check if instruction or body is set, otherwise force completion
            var cssSelector = this.$('.component-instruction').length > 0 ? '.component-instruction'
                : (this.$('.bubble').length > 0 ? '.bubble' : null);

            if (!cssSelector) {
                this.setCompletionStatus();
            } else {
                this.model.set('cssSelector', cssSelector);
                this.$(cssSelector).on('inview', _.bind(this.inview, this));
            }

            this.$('.bubble').css({
              'border': 'solid '+this.model.get('_text')._borderWidth+'px',
              'border-radius': this.model.get('_text')._cornerRadius+'px'
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

        resizeControl: function() {
            this.resetStyles();

            if (Adapt.device.screenSize=='small') {
                this.setupSmallSize();
            } else if (Adapt.device.screenSize=='medium') {
                this.setupMediumSize();
            } else {
                this.setupLargeSize();
            }
            this.resizeImage(Adapt.device.screenSize);
        },

        setupLargeSize: function() {
            // Text
            this.$('.character-text-text').addClass('overlay');
            this.$('.character-text-text').css('width',this.model.get('_text')._width+'%');
            this.$('.character-text-text').css('top',this.model.get('_text')._top);
            this.$('.character-text-text').css('left',this.model.get('_text')._left+'%');
            this.$('.bubble').addClass('bubble-'+(this.model.get('_text')._location));
            // Graphic
            if(this.model.has('_graphic')) {
                if(this.model.get('_graphic')._location == "left") {
                    this.$('.character-text-graphic').addClass('left');
                }
                if(this.model.get('_graphic')._location == "right") {
                    this.$('.character-text-graphic').addClass('right');
                }
                if(this.model.get('_graphic')._location == "center") {
                    this.$('.character-text-graphic').addClass('center');
                }
                if(this.$('.character-text-graphic img').attr('data-large') !== "") {
                  this.$('.character-text-widget').addClass('image');
                }
            }
        },

        setupMediumSize: function() {
            this.$('.character-text-graphic').addClass('center');
            this.$('.bubble').addClass('bubble-bottom');
        },

        setupSmallSize: function() {
            this.$('.character-text-graphic').addClass('center');
            this.$('.bubble').addClass('bubble-bottom');
        },

        resetStyles: function() {
            // Text
            this.$('.character-text-text').removeClass('overlay');
            this.$('.character-text-text').css('width','auto');
            this.$('.character-text-text').css('top',0);
            this.$('.character-text-text').css('left',0);
            this.$('.bubble').removeClass('bubble-top');
            this.$('.bubble').removeClass('bubble-bottom');
            this.$('.bubble').removeClass('bubble-left');
            this.$('.bubble').removeClass('bubble-right');
            // Arrow
            this.$('.arrow').attr('style','');
            this.$('.arrow-border').attr('style','');
            // Graphic
            this.$('.character-text-graphic').removeClass('left');
            this.$('.character-text-graphic').removeClass('right');
            this.$('.character-text-graphic').removeClass('center');
            // Widget
            this.$('.character-text-widget').removeClass('image');
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.setCompletionStatus();
                }
            }
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
                'border-width': (16 + this.model.get('_text')._borderWidth)+'px',
                'bottom': -( (16 + this.model.get('_text')._borderWidth)*2 + 1 )+'px',
                'margin-right': -(16 + this.model.get('_text')._borderWidth)+'px'
              });

              this.$('.bubble-right').find('.arrow-border').css({
                'border-width': (16 + this.model.get('_text')._borderWidth)+'px',
                'left': -( (16 + this.model.get('_text')._borderWidth)*2 + 1 )+'px',
                'margin-top': -(16 + this.model.get('_text')._borderWidth)+'px'
              });

              this.$('.bubble-bottom').find('.arrow-border').css({
                'border-width': (16 + this.model.get('_text')._borderWidth)+'px',
                'top': -( (16 + this.model.get('_text')._borderWidth)*2 + 1 )+'px',
                'margin-right': -(16 + this.model.get('_text')._borderWidth)+'px'
              });

              this.$('.bubble-left').find('.arrow-border').css({
                'border-width': (16 + this.model.get('_text')._borderWidth)+'px',
                'right': -( (16 + this.model.get('_text')._borderWidth)*2 + 1 )+'px',
                'margin-top': -(16 + this.model.get('_text')._borderWidth)+'px'
              });

            } else {
              this.$('.bubble-top').find('.arrow-border').css('display', 'none');
            }

            var src = this.$('.character-text-graphic img').attr('data-' + width);
            this.$('.character-text-graphic img').attr('src', src);

            this.$('.character-text-graphic').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        },

        removeInviewListener: function(model, changeAttribute) {
            if (changeAttribute) {
                this.$(this.model.get('cssSelector')).off('inview');
            }
        },

        remove: function() {
            this.$(this.model.get('cssSelector')).off('inview');
            Backbone.View.prototype.remove.apply(this, arguments);
        }

    });

    Adapt.register("character-text", CharacterText);

});
