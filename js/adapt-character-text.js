import Adapt from 'core/js/adapt';
import CharacterTextModel from './CharacterTextModel';
import CharacterTextView from './CharacterTextView';

export default Adapt.register('character-text', {
  model: CharacterTextModel,
  view: CharacterTextView
});
