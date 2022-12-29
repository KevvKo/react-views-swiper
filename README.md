# React-Views-Swiper
React-Views-Swiper, inspired by [React-Swipeable-Views](https://github.com/oliviertassinari/react-swipeable-views), is a small react library to provide a component to slide and swipe between different views by touch or mouse. 

# Documentation
## Installation
```
npm i react-swipeable-views
```

or

```
yarn add react-swipeable-views
```
## Examples
### Basic Example
```javascript
    import { Swiper } from "../package/react-views-swiper";

    <Swiper>
        <div style={styles.view1}>View 1</div>
        <div style={styles.view2}>View 2</div>
        <div style={styles.view3}>View 3</div>
    </Swiper>
```

**Note**: Further examples with a live demo will be provied in the next update. 
## API
| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | node | - | The property to provide the content for the slides
| containerStyle | object | {} | This prop is the inline-style for the container component, in which all views will be rendered
| index | number | 0 | This property is the index for the view, which will be displayed. You can pass once the index to show a different view as the first view or to control the views by external events for example tabs or buttons
| onChangeIndex | function | - | The onIndexChanged property is a callback which wll be invoked, if the index of the current displayed view is changed
| onChangeView | function | - | The onChangeView property is a callback which wll be invoked, if the current view has changed, independently by swipe or anything else
| renderOnlyActive | bool | false | If true, the component will render only the current active view. Any other view will only rendered, if the index is changed to the regarding view index 
| resistance | bool | false | If true, the bouncing effect will be avoided when swiping by touch