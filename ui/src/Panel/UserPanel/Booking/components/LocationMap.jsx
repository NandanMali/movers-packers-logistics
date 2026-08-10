import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-routing-machine";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const pickupIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const dropIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const getAddress = async (lat, lng) => {

    try {

        const response = await fetch(

            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

        );

        const data = await response.json();

        return data.display_name || "";

    }

    catch (error) {


        return "";

    }

};

const calculateRoute = async (pickup, drop) => {

    if (!pickup || !drop) return null;

    const response = await fetch(

        `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=false`

    );
    const data = await response.json();

    if (!data.routes?.length) return null;

    const distance = data.routes[0].distance / 1000;

    const duration = data.routes[0].duration / 60;

    return {

        distance,

        duration,

        estimatedFare: Math.round(distance * 18)


    };

};


function ClickHandler({

    booking,

    setBooking

}) {

    useMapEvents({

        async click(e) {

            const address = await getAddress(

                e.latlng.lat,

                e.latlng.lng

            );

            if (!booking.pickupCoordinates) {

                setBooking({

                    ...booking,

                    pickupCoordinates: e.latlng,

                    pickup: address

                });

            }

           else if (!booking.dropCoordinates) {


    setBooking({

        ...booking,

        dropCoordinates: e.latlng,

        drop: address,
    });

}

        }

    });

    return null;

}

function MapUpdater({ booking }) {

    const map = useMap();


    useEffect(()=>{

    if (booking.dropCoordinates) {

        map.flyTo(

            booking.dropCoordinates,

            16,

            {
                animate: true,
                duration: 1.5
            }

        );

    }

    else if (booking.pickupCoordinates) {

        map.flyTo(

            booking.pickupCoordinates,

            16,

            {
                animate: true,
                duration: 1.5
            }

        );

    }

    },[
         booking.pickupCoordinates,

        booking.dropCoordinates,

        map
    ])

    return null;

}


function Routing({ booking }) {

    const map = useMap();

    useEffect(() => {

        if (
            !booking.pickupCoordinates ||
            !booking.dropCoordinates
        ) {
            return;
        }

        const routingControl = L.Routing.control({

            waypoints: [

                L.latLng(
                    booking.pickupCoordinates.lat,
                    booking.pickupCoordinates.lng
                ),

                L.latLng(
                    booking.dropCoordinates.lat,
                    booking.dropCoordinates.lng
                )

            ],
            createMarker: () => null,

lineOptions: {
    styles: [
        {
            color: "#E31E24",
            weight: 5
        }
    ]
},

            routeWhileDragging: true,

            addWaypoints: false,

            draggableWaypoints: false,

            fitSelectedRoutes: true,

            show: false

        }).addTo(map);

        return () => {

            map.removeControl(routingControl);

        };

    }, [

        booking.pickupCoordinates,

        booking.dropCoordinates,

        map

    ]);

    return null;

}

export default function LocationMap({

    booking,
    setBooking

}) {

   useEffect(() => {

    const updateRoute = async () => {

        if (
            !booking.pickupCoordinates ||
            !booking.dropCoordinates
        ) {
            return;
        }

        const route = await calculateRoute(
            booking.pickupCoordinates,
            booking.dropCoordinates
        );

        if (!route) return;

        setBooking(prev => ({
            ...prev,
            distance: route.distance,
            duration: route.duration,
            estimatedFare: route.estimatedFare
        }));

    };

    updateRoute();

}, [
    booking.pickupCoordinates,
    booking.dropCoordinates
]);

    return (

        <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            scrollWheelZoom={true}
            style={{
                width: "100%",
                height: "450px",
                borderRadius: "15px"
            }}
        >

            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler
                booking={booking}
                setBooking={setBooking}
            />

            <MapUpdater booking={booking}/>

            <Routing booking={booking} />

            {
                booking.pickupCoordinates && (

                   <Marker

    position={booking.pickupCoordinates}

    icon={pickupIcon}

    draggable={true}

    eventHandlers={{

    async dragend(e){

    const point = e.target.getLatLng();

    const address = await getAddress(
        point.lat,
        point.lng
    );


    setBooking(prev=>({

        ...prev,

        pickupCoordinates:point,

        pickup:address,

    }));

}

}}
    

/>

                )
            }

            {
                booking.dropCoordinates && (

                    <Marker

    position={booking.dropCoordinates}

    icon={dropIcon}

    draggable={true}

    eventHandlers={{

    async dragend(e){

    const point = e.target.getLatLng();

    const address = await getAddress(
        point.lat,
        point.lng
    );

   

    setBooking(prev=>({

        ...prev,

        dropCoordinates:point,

        drop:address,

    }));

}

}}

/>

                )
            }

        </MapContainer>

    );

}