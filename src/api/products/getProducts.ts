import axios from "axios";
import { InApiResponse } from "../../interface";


// const response: InApiResponse = {
//     "error": null,
//     "data": [
//         {
//             "id": "1",
//             "name": "Wireless Headphones",
//             "description": "High-quality wireless headphones with noise cancellation.",
//             "stock_current": 50,
//             "category_id": {
//                 "name": "Electronics",
//                 "_id": "cat-001"
//             },
//             "image": "https://example.com/images/headphones.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse A"
//             },
//             "brand_id": "brand-001",
//             "createdAt": "2024-10-20T08:00:00Z",
//             "quantity": 10,
//             "stock_min": "5"
//         },
//         {
//             "id": "2",
//             "name": "Smartwatch",
//             "description": "Water-resistant smartwatch with heart rate monitor.",
//             "stock_current": 75,
//             "category_id": {
//                 "name": "Wearables",
//                 "_id": "cat-002"
//             },
//             "image": "https://example.com/images/smartwatch.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse B"
//             },
//             "brand_id": "brand-002",
//             "createdAt": "2024-10-19T09:30:00Z",
//             "quantity": 8,
//             "stock_min": "4"
//         },
//         {
//             "id": "3",
//             "name": "Laptop",
//             "description": "High-performance laptop for professionals.",
//             "stock_current": 30,
//             "category_id": {
//                 "name": "Computers",
//                 "_id": "cat-003"
//             },
//             "image": "https://example.com/images/laptop.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse C"
//             },
//             "brand_id": "brand-003",
//             "createdAt": "2024-10-18T10:45:00Z",
//             "quantity": 6,
//             "stock_min": "3"
//         },
//         {
//             "id": "4",
//             "name": "Bluetooth Speaker",
//             "description": "Portable speaker with excellent sound quality.",
//             "stock_current": 100,
//             "category_id": {
//                 "name": "Audio",
//                 "_id": "cat-004"
//             },
//             "image": "https://example.com/images/speaker.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse D"
//             },
//             "brand_id": "brand-004",
//             "createdAt": "2024-10-17T15:30:00Z",
//             "quantity": 15,
//             "stock_min": "5"
//         },
//         {
//             "id": "5",
//             "name": "Gaming Mouse",
//             "description": "Ergonomic gaming mouse with customizable RGB lighting.",
//             "stock_current": 45,
//             "category_id": {
//                 "name": "Gaming Accessories",
//                 "_id": "cat-005"
//             },
//             "image": "https://example.com/images/mouse.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse E"
//             },
//             "brand_id": "brand-005",
//             "createdAt": "2024-10-16T11:00:00Z",
//             "quantity": 20,
//             "stock_min": "10"
//         },
//         {
//             "id": "6",
//             "name": "Action Camera",
//             "description": "High-resolution camera for outdoor adventures.",
//             "stock_current": 60,
//             "category_id": {
//                 "name": "Cameras",
//                 "_id": "cat-006"
//             },
//             "image": "https://example.com/images/camera.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse F"
//             },
//             "brand_id": "brand-006",
//             "createdAt": "2024-10-15T13:45:00Z",
//             "quantity": 5,
//             "stock_min": "2"
//         },
//         {
//             "id": "7",
//             "name": "Electric Toothbrush",
//             "description": "Rechargeable toothbrush with multiple cleaning modes.",
//             "stock_current": 120,
//             "category_id": {
//                 "name": "Personal Care",
//                 "_id": "cat-007"
//             },
//             "image": "https://example.com/images/toothbrush.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse G"
//             },
//             "brand_id": "brand-007",
//             "createdAt": "2024-10-14T14:00:00Z",
//             "quantity": 10,
//             "stock_min": "4"
//         },
//         {
//             "id": "8",
//             "name": "4K Monitor",
//             "description": "Large screen monitor with ultra-high resolution.",
//             "stock_current": 25,
//             "category_id": {
//                 "name": "Displays",
//                 "_id": "cat-008"
//             },
//             "image": "https://example.com/images/monitor.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse H"
//             },
//             "brand_id": "brand-008",
//             "createdAt": "2024-10-13T17:30:00Z",
//             "quantity": 7,
//             "stock_min": "3"
//         },
//         {
//             "id": "9",
//             "name": "Wireless Charger",
//             "description": "Fast wireless charging pad compatible with various devices.",
//             "stock_current": 80,
//             "category_id": {
//                 "name": "Chargers",
//                 "_id": "cat-009"
//             },
//             "image": "https://example.com/images/charger.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse I"
//             },
//             "brand_id": "brand-009",
//             "createdAt": "2024-10-12T10:20:00Z",
//             "quantity": 12,
//             "stock_min": "6"
//         },
//         {
//             "id": "10",
//             "name": "Fitness Tracker",
//             "description": "Lightweight tracker to monitor health metrics.",
//             "stock_current": 95,
//             "category_id": {
//                 "name": "Fitness",
//                 "_id": "cat-010"
//             },
//             "image": "https://example.com/images/fitness_tracker.jpg",
//             "warehouse_id": {
//                 "name": "Warehouse J"
//             },
//             "brand_id": "brand-010",
//             "createdAt": "2024-10-11T09:00:00Z",
//             "quantity": 5,
//             "stock_min": "3"
//         }
//     ]
// }


export const getProducts = async (): Promise<InApiResponse> => {
    try {
        
        //const response = await axios.get("https://apimocha.com/sigindioy/products");
        const response = await axios.get("https://run.mocky.io/v3/cc55e8c7-26d8-4d2a-854a-c1270e400d9e");
        
        return response.data;
        //return res;
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        throw error;
    }
};
