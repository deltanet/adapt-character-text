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

**_text** (object):  This `_text` attributes group stores the properties for the text box. It contains values for **body**, **_location**, **_top**, **_left**, **_width**, **_borderWidth**, **_color**, **_background**, **_cornerRadius**, and **_shadowEnabled**.  

>**body** (string): This text displays in the text box.  

>**_location** (string): Sets the position of the text box. Options are `left` or `right`.  

>**_top** (number): Enter the number of pixels the text box should be from the top of the component widget.

>**_left** (number): Enter the percentage of the component width the text box should be from the left of the component.  

>**_width** (number): Enter the percentage of the component width to set the width of the text box.

>**_borderWidth** (number): Enter the value in pixels for the border width on the text box.

>**_color** (string): Defines the CSS color class for the body text.  

>**_background** (string): Defines the CSS background color class for the body text.  

>**_cornerRadius** (number): Enter the value in pixels for the corner radius on the text box.  

>**_shadowEnabled** (boolean): If set to `true`, a drop shadow will be applied to the text element.  

**_graphic** (object):  This `_graphic` attributes group stores the properties for the image. It contains values for **_location**, **alt**, **large**, **medium**, and **small**.  

>**_location** (string): Sets the position of the image. Options are `left` or `right`.

>**alt** (string): This text becomes the image’s `alternative text` attribute.  

>**large** (string): File name (including path) of the image on large sized devices. Path should be relative to the *src* folder.  

>**medium** (string): File name (including path) of the image on medium sized devices. Path should be relative to the *src* folder.  

>**small** (string): File name (including path) of the image on small sized devices. Path should be relative to the *src* folder.  

## Accessibility
+ **Character text** has been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. This label is not a visible element. It is utilized by assistive technology such as screen readers. Should the region's text need to be customised, it can be found within the **globals** object in [*properties.schema*](https://github.com/deltanet/adapt-character-text/blob/master/properties.schema).

If the 'alternative text' is left empty, the image will *not* be included in the tab order.

## Limitations

No known limitations.  

----------------------------
**Version number:**  4.1.0    
**Framework versions supported:**  5.8+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-character-text/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes  
**Authoring tool support:** Yes  
