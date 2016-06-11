# reduxa
goa plug-in to generate redux boilerplate

Run `goagen` from inside your client project to create the `reduxa/` folder and generated code.

Assumes you are using ES6 and likely Babel.

```
goagen gen -d github.com/goadesign/goa-cellar/design --pkg-path=github.com/kkeuning/reduxa
```

Currently generates your action types, actions, and action creators for use with Redux, Axios, and Redux Thunk middleware.

Thanks to Dan Abramov for Redux and to Raphael Simon for Goa.  
