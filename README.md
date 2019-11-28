# Manchester Tech Meetup Data (CompiledMCR Data)
 
Using the [Meetup API](https://www.meetup.com/meetup_api/) we have been able to gather raw data from the technology Meetup scene in Manchester. The purpose of curating this data is to assist the community by producing data analytics upon it, and also performing interesting data visualizations.

## Running 

If you wish to generate fresh data yourself, which will be placed in the [_data](_data) folder, you can run the following command through your command prompt (assuming you have previously ran `npm i` with NPM installed).

```
npm run pull
```

We do plan to include web pages showing off interesting data visualizations, which will be generated in a `_site` folder, also including an index page. To generate these pages you can run the following command:

```
npm run gen
```