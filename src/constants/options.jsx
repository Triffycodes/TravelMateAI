export const SelectTravelsList=[
    {
        id:1,
        title:"Just Me",
        desc:"A Solo travels in exploration",
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:"A Couple",
        desc:"Two travels in tandem",
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:"Family",
        desc:"A group of fun loving adv",
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:"Friends",
        desc:"A bunch of thrill-seekers",
        icon:'🎢',
        people:'5 to 10 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"Stay conscious of cost",
        icon:'💰',
    },
    {
        id:2,
        title:"Moderate",
        desc:"Keep cost on the average side",
        icon:'💵',
    },
    {
        id:3,
        title:"Luxury",
        desc:"Money money money!!!",
        icon:'💸',
    }
]

export const AI_PROMPT = "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, jeo coordinates, rating, descriptions and suggest itinerary with placeName,time, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} Days with each day plan with best time to visit in JSON format."