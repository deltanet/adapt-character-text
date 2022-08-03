import React from 'react';
import { html, classes, compile, templates } from 'core/js/reactHelpers';

export default function CharacterText (props) {
  const {
    _text,
    _graphic
  } = props;

  const bubbleStyle = {
    border: _text._borderWidth,
    borderStyle: 'solid',
    borderRadius: _text._cornerRadius,
    borderColor: _text._color,
    color: _text._color,
    backgroundColor: _text._background
  };

  return (
    <div className="component__inner character-text__inner">

      <templates.header {...props} />

      <div className="component__widget character-text__widget">

        <div className="character-text__graphic">
          <templates.image {..._graphic}
            classNamePrefixes={['character-text']}
          />
        </div>

        <div className="character-text__text">

          <div
            className={classes([
              'bubble',
              _text._shadowEnabled && 'text-shadow'
            ])}
            style={bubbleStyle}
          >
            {html(compile(_text.body))}

            <div className="arrow"></div>

            <div className="arrow-border"></div>

          </div>

        </div>

      </div>

    </div>
  );
}
