import icons from "./icons";
import images from "./images";

export const cards = [
    {
        key: 1,
        title: "New York",
        location: "Location 1",
        price: "$12219",
        rating: 4.8,
        category: "house",
        image: images.newYork,
    },
    {
        key: 2,
        title: "Japan",
        location: "Location 2",
        price: "$1424",
        rating: 3,
        category: "house",
        image: images.japan,
    },
    {
        key: 3,
        title: "Accra",
        location: "Location 3",
        price: "$17821",
        rating: 2,
        category: "flat",
        image: images.ghana,
    },
    {
        key: 4,
        title: "La Grand Maison",
        location: "Location 4",
        price: "$21469",
        rating: 5,
        category: "villa",
        image: images.california,
    },
]

export const featuredCards = [
    {
        key: 1,
        title: "Featured 1",
        location: "Location 1",
        price: "$100",
        rating: 4.8,
        image: images.newYork,
        category: "house",
    },
    {
        key: 2,
        title: "Featured 2",
        location: "Location 2",
        price: "$200",
        rating: 3,
        image: images.japan,
        category: "flat",
    }
]


export const categories = [
    { title: "All", category: "All" },
    { title: "Houses", category: "House" },
    { title: "Condos", category: "Condo" },
    { title: "Duplexes", category: "Duplex" },
    { title: "Studios", category: "Studio" },
    { title: "Villas", category: "Villa" },
    { title: "Apartments", category: "Apartment" },
    { title: "Townhouses", category: "Townhouse" },
    { title: "Others", category: "Other" },
];

export const settings = [
    {
        title: "My Bookings",
        icon: icons.calendar,
    },
    {
        title: "Payments",
        icon: icons.wallet,
    },
    {
        title: "Profile",
        icon: icons.person,
    },
    {
        title: "Notifications",
        icon: icons.bell,
    },
    {
        title: "Security",
        icon: icons.shield,
    },
    {
        title: "Language",
        icon: icons.language,
    },
    {
        title: "Help Center",
        icon: icons.info,
    },
    {
        title: "Invite Friends",
        icon: icons.people,
    },
];

export const facilities = [
    {
        title: "Laundry",
        icon: icons.laundry,
    },
    {
        title: "Car Parking",
        icon: icons.carPark,
    },
    {
        title: "Sports Center",
        icon: icons.run,
    },
    {
        title: "Cutlery",
        icon: icons.cutlery,
    },
    {
        title: "Gym",
        icon: icons.dumbell,
    },
    {
        title: "Swimming pool",
        icon: icons.swim,
    },
    {
        title: "Internet",
        icon: icons.wifi,
    },
    {
        title: "Pet Center",
        icon: icons.dog,
    },
];

export const facilitiesImg = (facility) => {
    switch (facility.toLowerCase()) {
        case "laundry":
            return icons.laundry;
        case "car parking":
            return icons.carPark;
        case "sports center":
            return icons.run;
        case "cutlery":
            return icons.cutlery;
        case 'gym':
            return icons.dumbell;
        case 'swimming pool':
            return icons.swim;
        case 'internet':
            return icons.wifi;
        case 'pet center':
            return icons.dog;
        default:
            return null;
    }
}

export const gallery = [
    {
        id: 1,
        image: images.newYork,
    },
    {
        id: 2,
        image: images.japan,
    },
    {
        id: 3,
        image: images.newYork,
    },
    {
        id: 4,
        image: images.japan,
    },
    {
        id: 5,
        image: images.newYork,
    },
    {
        id: 6,
        image: images.japan,
    },
];
