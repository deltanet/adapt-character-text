define(function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var CharacterText = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
            this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
            // Listen for text change on audio extension
            this.listenTo(Adapt, "audio:changeText", this.replaceText);
        },
        
        postRender: function() {
            this.setReadyStatus();
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

            this.$('.bubble').css('border','solid '+ this.model.get('_text')._borderWidth+'px');
            this.$('.bubble').css('border-radius',this.model.get('_text')._cornerRadius+'px');

            if (Adapt.device.screenSize=='small') {
                this.setupMobile();
              } else {
                this.setupDefault();
            }

            if (Adapt.config.get('_audio') && Adapt.config.get('_audio')._isReducedTextEnabled && this.model.get('_reducedText') && this.model.get('_reducedText')._isEnabled) {
                this.replaceText(Adapt.audio.textSize);
            }
        },

        resizeControl: function() {

            this.resetStyles();

            if (Adapt.device.screenSize=='small') {
                this.setupMobile();
              } else {
                this.setupDefault();
            }
        },

        setupDefault: function() {
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
            }
        },

        setupMobile: function() {
            this.$('.character-text-graphic').addClass('center');
            this.$('.bubble').addClass('bubble-top');
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
            // Graphic
            this.$('.character-text-graphic').removeClass('left');
            this.$('.character-text-graphic').removeClass('right');
            this.$('.character-text-graphic').removeClass('center');
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
        },

        // Reduced text
        replaceText: function(value) {
            // If enabled
            if (Adapt.config.get('_audio') && Adapt.config.get('_audio')._isReducedTextEnabled && this.model.get('_reducedText') && this.model.get('_reducedText')._isEnabled) {
                // Change component title and body
                if(value == 0) {
                    if (this.model.get('displayTitle')) {
                        this.$('.component-title-inner').html(this.model.get('displayTitle')).a11y_text();
                    }
                    if (this.model.get('body')) {
                        this.$('.component-body-inner').html(this.model.get('body')).a11y_text();
                    }
                    this.$('.bubble').html(this.model.get('_text').body).a11y_text();
                } else {
                    if (this.model.get('displayTitleReduced')) {
                        this.$('.component-title-inner').html(this.model.get('displayTitleReduced')).a11y_text();
                    }
                    if (this.model.get('bodyReduced')) {
                        this.$('.component-body-inner').html(this.model.get('bodyReduced')).a11y_text();
                    }
                    this.$('.bubble').html(this.model.get('_text').bodyReduced).a11y_text();
                }
            }
        }
        
    });
    
    Adapt.register("character-text", CharacterText);
    
});