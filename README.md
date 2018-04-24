# adapt-character-text

**Character text** is a *presentation component* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This component displays a graphic and a speech bubble style text box.

## Settings Overview

The attributes listed below are used in *components.json* to configure **Character text**, and are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-character-text/blob/master/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `character-text`.

**_classes** (string): CSS class name to be applied to **Character text**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to guide the learner’s interaction with the component.

**_text** (object):  This `_text` attributes group stores the properties for the text box. It contains values for **body**, **_location**, **_top**, **_left**, **_width**, **_borderWidth**, and **_cornerRadius**.  

>**body** (string): This text displays in the text box.  

>**_location** (string): Sets the position of the text box. Options are `left` or `right`.  

>**_top** (number): Enter the number of pixels the text box should be from the top of the component widget.

>**_left** (number): Enter the percentage of the component width the text box should be from the left of the component.  

>**_width** (number): Enter the percentage of the component width to set the width of the text box.

>**_borderWidth** (number): Enter the value in pixels for the border width on the text box.

>**_cornerRadius** (number): Enter the value in pixels for the corner radius on the text box.

**_graphic** (object):  This `_graphic` attributes group stores the properties for the image. It contains values for **_location**, **alt**, **large**, **medium**, and **small**.  

>**_location** (string): Sets the position of the image. Options are `left` or `right`.

>**alt** (string): This text becomes the image’s `alt` attribute.  

>**large** (string): File name (including path) of the image on large sized devices. Path should be relative to the *src* folder.  

>**medium** (string): File name (including path) of the image on medium sized devices. Path should be relative to the *src* folder.  

>**small** (string): File name (including path) of the image on small sized devices. Path should be relative to the *src* folder.  

## Accessibility
+ Remember to include an **alt** attribute for all your images. Screen readers will read aloud alt text content, so leave the alt text empty (`"alt": ""`) if the image does not contribute significant course content.  
+ If the alt text is left empty, the image will *not* be included in the tab order. If the component is configured to display [title or body text]((https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)), these will remain keyboard accessible.  
+ If the alt text is assigned a value, but the component is not being tracked for course completion, assign the class `"no-state"` to **_classes**. Adapt's accessibility mode reports to the learner the 'state' of the component, whether it is complete or incomplete. It is not common practice to require interaction with (or 'completion' of) an image for course completion. Indeed, a screen reader needlessly announcing the state of an image may be distracting for the learner. Assigning the built-in class `"no-state"` prevents this.  

## Limitations

No known limitations.  

----------------------------
**Version number:**  2.0.12    
**Framework versions supported:**  ^2.0.4    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-character-text/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes  
**Authoring tool support:** Yes  
