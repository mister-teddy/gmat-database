# gmat-database

## Usage

Use [GitHub Actions Artifacts API](https://docs.github.com/en/rest/actions/artifacts#list-artifacts-for-a-repository) to get the latest version of the databse (as an artifact).

Then consume the database as a JSONP endpoint:

```html
<script src="gmat-database.js" />
<script>
  console.log(gmatDatabase);
</script>
```
