import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import ComponentView from 'core/js/views/componentView';

class CharacterTextView extends ComponentView {

  initialize(...args) {
    super.initialize(...args);

    this.setUpEventListeners();
  }

  setUpEventListeners() {
    this.listenTo(Adapt, 'device:resize', this.resizeControl);
  }

  postRender() {
    this.resizeControl();

    this.$('.character-text__widget').imageready(this.setReadyStatus.bind(this));

    this.setupInviewCompletion('.character-text__widget');
  }

  resizeControl() {
    this.resetStyles();

    if (device.screenSize == 'small') {
      this.setupSmallSize();
    } else if (device.screenSize == 'medium') {
      this.setupMediumSize();
    } else {
      this.setupLargeSize();
    }

    this.resizeImage(device.screenSize);
  }

  setupLargeSize() {
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
    }
  }

  setupMediumSize() {
    this.$('.character-text__graphic').addClass('center');
    this.$('.bubble').addClass('bubble-bottom');
  }

  setupSmallSize() {
    this.$('.character-text__graphic').addClass('center');
    this.$('.bubble').addClass('bubble-bottom');
  }

  resetStyles() {
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
  }

  resizeImage(width) {
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
  }

}

CharacterTextView.template = 'characterText.jsx';

export default CharacterTextView;
