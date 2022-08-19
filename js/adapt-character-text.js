import components from 'core/js/components';
import CharacterTextModel from './CharacterTextModel';
import CharacterTextView from './CharacterTextView';

export default components.register('character-text', {
  model: CharacterTextModel,
  view: CharacterTextView
});
