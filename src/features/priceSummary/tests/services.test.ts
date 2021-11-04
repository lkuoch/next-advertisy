export {};

// import * as services from "@features/priceSummary/services";
// import { Prices } from "@features/priceSummary/models";
// import { CustomerState } from "@features/customer/state";
// import { Offers } from "@features/customer/models";
// import { Product } from "@features/cart/models";

// describe("PriceSummary Service Tests", () => {
//   let customerState: CustomerState;
//   let currentOffers: Offers | undefined;
//   let products: Product[];

//   describe("[calculateNewTotals]", () => {
//     beforeEach(() => {
//       customerState = {
//         current: 0,
//         selections: {},
//         meta: {},
//       };
//       currentOffers = undefined;
//       products = [
//         {
//           id: 0,
//           Name: "Test Product",
//           Description: "Test Product Description",
//           RetailPrice: 100.0,
//         },
//       ];
//     });

//     describe("customerSelections and currentOffers not initialized", () => {
//       it("calculates default result", () => {
//         const expectedResult: Prices = {
//           totalPrice: 0,
//           discountPrice: 0,
//           finalTotalPrice: 0,
//         };

//         expect(
//           services.calculateNewTotals({
//             customerState,
//             currentOffers,
//             products,
//           })
//         ).toEqual(expectedResult);
//       });
//     });

//     describe("customerSelections initialized and currentOffers not initialized", () => {
//       it("calculates 1 item result", () => {
//         customerState.selections = {
//           "0": {
//             "0": {
//               qty: 1,
//             },
//           },
//         };

//         const expectedResult: Prices = {
//           totalPrice: 100.0,
//           discountPrice: 0,
//           finalTotalPrice: 100.0,
//         };

//         expect(
//           services.calculateNewTotals({
//             customerState,
//             currentOffers,
//             products,
//           })
//         ).toEqual(expectedResult);
//       });

//       it("calculates n item result", () => {
//         customerState.selections = {
//           "0": {
//             "0": {
//               qty: 3,
//             },
//           },
//         };

//         const expectedResult: Prices = {
//           totalPrice: 300.0,
//           discountPrice: 0,
//           finalTotalPrice: 300.0,
//         };

//         expect(
//           services.calculateNewTotals({
//             customerState,
//             currentOffers,
//             products,
//           })
//         ).toEqual(expectedResult);
//       });
//     });

//     describe("customerSelections initialized and currentOffers initialized", () => {
//       describe("NewPrice offer scenario", () => {
//         beforeEach(() => {
//           currentOffers = {
//             "0": [
//               {
//                 type: "NewPrice",
//                 values: [75.0],
//               },
//             ],
//           };
//         });

//         it("calculates 1 item discount result", () => {
//           customerState.selections = {
//             "0": {
//               "0": {
//                 qty: 1,
//               },
//             },
//           };

//           const expectedResult: Prices = {
//             totalPrice: 100.0,
//             discountPrice: 25.0,
//             finalTotalPrice: 75.0,
//           };

//           expect(expectedResult).toEqual(
//             services.calculateNewTotals({
//               customerState,
//               currentOffers,
//               products,
//             })
//           );
//         });

//         it("calculates n item discount result", () => {
//           customerState.selections = {
//             "0": {
//               "0": {
//                 qty: 3,
//               },
//             },
//           };

//           const expectedResult: Prices = {
//             totalPrice: 300.0,
//             discountPrice: 75.0,
//             finalTotalPrice: 225.0,
//           };

//           expect(expectedResult).toEqual(
//             services.calculateNewTotals({
//               customerState,
//               currentOffers,
//               products,
//             })
//           );
//         });
//       });

//       describe("XYDeal offer scenario", () => {
//         beforeEach(() => {
//           currentOffers = {
//             "0": [
//               {
//                 type: "XYDeal",
//                 values: [5, 3],
//               },
//             ],
//           };
//         });

//         it("calculates n < XYDeal discount result", () => {
//           customerState.selections = {
//             "0": {
//               "0": {
//                 qty: 1,
//               },
//             },
//           };

//           const expectedResult: Prices = {
//             totalPrice: 100.0,
//             discountPrice: 0.0,
//             finalTotalPrice: 100.0,
//           };

//           expect(
//             services.calculateNewTotals({
//               customerState,
//               currentOffers,
//               products,
//             })
//           ).toEqual(expectedResult);
//         });

//         it("calculates n >= XYDeal discount result", () => {
//           customerState.selections = {
//             "0": {
//               "0": {
//                 qty: 5,
//               },
//             },
//           };

//           const expectedResult: Prices = {
//             totalPrice: 500.0,
//             discountPrice: 200.0,
//             finalTotalPrice: 300.0,
//           };

//           expect(
//             services.calculateNewTotals({
//               customerState,
//               currentOffers,
//               products,
//             })
//           ).toEqual(expectedResult);
//         });
//       });
//     });
//   });
// });
