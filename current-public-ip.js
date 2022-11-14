let responseJson = await jsonKeys() 
let widget = await createWidget(responseJson) 

if (config.runsInWidget) { 
    Script.setWidget(widget) 
}  
else { 
    widget.presentMedium() 
} 

Script.complete() 

async function createWidget(responseJson) { 
    let widget = new ListWidget() 
    let gradient = new LinearGradient() 
    gradient.locations = [0, 1] 
    gradient.colors = [ 
        new Color("141414"), 
        new Color("13233F") 
    ] 
    widget.backgroundGradient = gradient 
 
    let titleStack = widget.addStack() 
    titleStack.addSpacer(4) 
    let organisationElement = titleStack.addText(responseJson.organisation) 
    organisationElement.textColor = Color.white() 
    organisationElement.textOpacity = 0.7 
    organisationElement.font = Font.mediumSystemFont(13) 
    widget.addSpacer(12) 
 
    let ipElement = widget.addText(responseJson.ip) 
    ipElement.textColor = Color.white() 
    ipElement.font = Font.boldSystemFont(18) 
    widget.addSpacer(2) 

    let countryElement = widget.addText(responseJson.country) 
    countryElement.minimumScaleFactor = 0.5 
    countryElement.textColor = Color.white() 
    countryElement.font = Font.systemFont(18) 
 
    if (!config.runsWithSiri) { 
        widget.addSpacer(8) 
    } 
 
    return widget 
} 
async function jsonKeys() { 
    let json = await getJson() 
 
    return { 
        ip: json["query"], 
        country: json["country"], 
        organisation: json["org"] 
    } 
} 
 
async function getJson() { 
    let organisation = "http://ip-api.com/json" 
    let req = new Request(organisation) 
    return await req.loadJSON() 
} 
 
async function loadAppIcon() { 
    let organisation = "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/21/1e/13/211e13de-2e74-4221-f7db-d6d2c53b4323/AppIcon-1x_U007emarketing-0-7-0-85-220.png/540x540sr.jpg" 
    let req = new Request(organisation) 
    return req.loadImage() 
}