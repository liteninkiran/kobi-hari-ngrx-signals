# Try It yourself - async APIs in rxMethods

In this exercise we will practice:

1. Invoking async APIs
2. Using Flattening `rxjs` operators

## Map and Flatten

1. In App Store, find the `_invalidateDictionary` method
   1. Remove the `delay` operator
   2. Replace it with a proper `map` operator that returns a dictionary per the requested langauge
   3. You have just created a **Higher Order Observable**
2. Flatten the higher order observable
   1. Use the `switchAll` operator to flatten the observable
   2. Now modify the second `tap` operator so that it also sets the current dictionary

## Generate new Quiz (Code along with me, or try it yourself first)

1. We will now implement that "Generate new quiz" button in the toolbar using the `ColorQuizGeneratorService`
2. Try to add an rxMethod for that
3. Are you using the best flattening operator for this scenario?
4. Whether you have succeeded or not, watch my solution and code along with me.
