# Frontend assignment

## Description

Your task is to create a nice user interface in Angular for the provided GET /requests/{id} endpoint.
To be able to call this api, you need to run a json-server with the provided dataset in db.json. (you don't need to modify this file)

Here is a quick example how the page should look like:
![alt text](image.png)

**Instructions**:
1. ``` npm install json-server ```
2. ``` npx json-server db.json ```
3. ``` call the GET http://localhost:3000/requests/1 ```

**Requirement**
- The user interface should contain a title with the text "Summary of { requestType }". 
- It should be followed by three sections: Personal details, Request details, History
- In the history section, you should display each element of the array. Each history element should display an icon on the left and the data from the response object.
- Icons should be displayed conditionally. In case of SUBMITTED status there should be a letter icon, for APPROVED_BY_MANAGER status it should display a checkmark and an X icon for REJECTED_BY_MANAGER. (pick one of your favourite set of icons)
- Create a private github repository for your project and share your code with the usernames we'll send you via email

**Formatting requirements**:
- The request types should be display in lowercase except the first character and if it's more than one word, it should be separated by spaces. 
- Same rule applies on statuses.
- Dates should be displayed in "dd mm yyyy" format and date-time properties should use the "dd mm yyyy | hh:mm" format.
- Boolean values should be formatted to "Yes" or "No" values.

**Bonus**:
- the managers want to be able to edit the start- and/or endDate for PARENTAL_LEAVE if the flexible property is true. It should be validated when changes submitted by the number of maximum flexible days.
- This means start- and endDate can be modified in both direction, but limited by the maximumFlexibleDays. eg. the range between the two dates cannot be more then maximumFlexibleDays
- If the flexible property is false, dates should not be editable
- You dont need to call any endpoint when you apply the changes.
- It doesn't have to pretty, but we like nice designs :)

(if the image doesn't display, please open it separately)

**The requestDetails object has the following structure (defined in json-schema):**

```
    {
        "requestType": {
            "type": enum
            "values": [ INTERNAL_MOBILITY, PARENTAL_LEAVE, ILLNESS ]
        },
        "personDetails": {
            "type": object
            "properties": {
                "firstName": {
                    "type": string
                },
                "lastName": {
                    "type": string
                },
                "birthDay": {
                    "type": string,
                    "format": date
                    "examples": [ 2022-11-12 ]
                }
            }
        },
        "requestDetails": {
            "type": object
        }
        "history": {
            "type": array
            "items": {
                "type": object,
                "properties": {
                    "status": {
                        "type": enum,
                        "values:" [ SUBMITTED, APPROVED_BY_MANAGER, REJECTED_BY_MANAGER ]
                    },
                    "created": {
                        "type": string,
                        "format": date-time
                        "examples": [ 2024-01-01T12:00:00Z ]
                    },
                    "comment": {
                        "type": string
                    },
                    "required": [ "created", "status" ]
                }
            }
        }
        "required": [ "requestType", "personDetails", "requestDetails", "history" ]
    }
```

Be aware that requestDetails is on object and its type is reflected by the requestType property. It has no optional properties!

*A requestDetails objects can be:*

in case of:

- INTERNAL_MOBILITY
```
    "requestDetails": {
            "type": object,
            "properties": {
                "desiredStartDate": {
                    "type": string,
                    "format": date
                }
                "from": {
                    "type": string
                }
                "to": {
                    "type": string
                }
            }
    }
```

- PARENTAL_LEAVE
```
    "requestDetails": {
            "type": object,
            "properties": {
                "startDate": {
                    "type": string,
                    "format": date
                }
                "endDate": {
                    "type": string,
                    "format": date
                }
                "flexible": {
                    "type": boolean
                },
                "numberOfMaximumFlexibleDays": {
                    "type": number,
                    "minimum": 0,
                    "maximum": 30
                }
            }
    }
```

- ILLNESS
```
    "requestDetails": {
            "type": object,
            "properties": {
                "startDate": {
                    "type": string,
                    "format": date
                }
                "endDate": {
                    "type": string,
                    "format": date
                }
                "longTerm": {
                    "type": boolean
                },
                "medicalDocumentRequired": {
                    "type": boolean
                }
            }
    }
```

