OR.location + OR.name is the same as AND filter
```json
{
  "filter": {
    "OR": [
      {
        "location": { "contains": "street" },
        "name": { "contains": "project" }
      },
      {
        "location": { "contains": "lane" }
      }
    ],
    "AND": [
      {
        "name": { "contains": "project" }
      },
      {
        "OR": [
          {
            "status": { "equals": "draft" }
          },
          {
            "status": { "equals": "completed" }
          }
        ]
      }
    ]
  }
}
```
