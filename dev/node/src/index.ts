import { zugferd } from "node-zugferd";
import { mustangValidator } from "@node-zugferd/validator-mustang";
import { EXTENDED } from "node-zugferd/profile";

const main = async () => {
	const invoicer = zugferd({
		profile: EXTENDED,
		strict: false,
		validator: mustangValidator({
			tempDir: "./.tmp",
		}),
		logger: {
			level: "debug",
		},
	});

	const data: typeof invoicer.$Infer.Schema = {
		testIndicator: true,
		number: "RE4123123162018",
		name: "Rechnung",
		typeCode: "380",
		issueDate: new Date("2020-02-14"),
		includedNote: [
			{
				content: "",
				subjectCode: "REG",
			},
			{
				content: "Kopftext",
			},
		],
		transaction: {
			line: [
				{
					identifier: "1",
					tradeProduct: {
						globalIdentifier: {
							schemeIdentifier: "0160",
							value: "ART232323",
						},
						sellerAssignedID: "",
						buyerAssignedID: "",
						name: "Käse",
					},
					tradeAgreement: {
						grossTradePrice: {
							chargeAmount: "32.0000",
							discounts: {
								actualAmount: "3.2000",
							},
						},
						netTradePrice: {
							chargeAmount: "28.8000",
						},
					},
					tradeDelivery: {
						billedQuantity: {
							amount: "32.0000",
							unitMeasureCode: "KGM",
						},
					},
					tradeSettlement: {
						tradeTax: {
							calculatedAmount: "64.51",
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: "7.00",
						},
						monetarySummation: {
							lineTotalAmount: "1024.00",
							totalAllowanceChargeAmount: "102.40",
						},
					},
				},
				{
					identifier: "2",
					tradeProduct: {
						globalIdentifier: {
							value: "PN000001",
							schemeIdentifier: "0160",
						},
						sellerAssignedID: "",
						buyerAssignedID: "",
						name: "Fleisch",
					},
					tradeAgreement: {
						grossTradePrice: {
							chargeAmount: "32.0000",
							discounts: {
								actualAmount: "10.0000",
							},
						},
						netTradePrice: {
							chargeAmount: "22.0000",
						},
					},
					tradeDelivery: {
						billedQuantity: {
							amount: "1.0000",
							unitMeasureCode: "KGM",
						},
					},
					tradeSettlement: {
						tradeTax: {
							calculatedAmount: "1.54",
							typeCode: "VAT",
							categoryCode: "S",
							rateApplicablePercent: "7.00",
						},
						monetarySummation: {
							lineTotalAmount: "32.00",
							totalAllowanceChargeAmount: "10.00",
						},
					},
				},
			],
			tradeAgreement: {
				seller: {
					name: "Muster GmbH",
					tradeContact: {
						name: "Max Mustermann",
					},
					postalAddress: {
						postCode: "75331",
						line1: "Buckelweg 110",
						city: "Engelsbrand",
						countryCode: "DE",
					},
					taxRegistration: {
						localIdentifier: "1234567890",
					},
				},
				buyer: {
					name: "Test Kunde",
					tradeContact: {
						name: "Ansprechpartner",
					},
					postalAddress: {
						postCode: "12334",
						line1: "Adresse",
						city: "Basdsd",
						countryCode: "DE",
					},
				},
				customerOrderReference: {
					issuerAssignedID: "Bestellnummer",
					date: new Date("2020-02-14"),
				} as any,
			},
			tradeDelivery: {
				shipTo: {
					name: "Test Kunde",
					postalAddress: {
						postCode: "1234",
						line1: "Adresse",
						city: "Basdsd",
						countryCode: "DE",
					},
				},
			},
			tradeSettlement: {
				currencyCode: "EUR",
				paymentInstruction: {
					typeCode: "1",
					transfers: [
						{
							accountName: "Norisbank Berlin",
							paymentAccountIdentifier: "DE27100777770209299700",
							nationalAccountNumber: "NORSDE51XXX",
						},
					],
				},
				vatBreakdown: [
					{
						calculatedAmount: "66.06",
						typeCode: "VAT",
						basisAmount: "943.60",
						categoryCode: "S",
						rateApplicablePercent: "7.00",
					},
				],
				charges: [
					{
						actualAmount: "112.40",
						reason: "Gesamt Rabatt",
						categoryTradeTax: {
							categoryCode: "S",
							vatRate: "7.00",
						},
					},
				],
				monetarySummation: {
					lineTotalAmount: "1056.00",
					chargeTotalAmount: "0.00",
					allowanceTotalAmount: "112.40",
					taxBasisTotalAmount: "943.60",
					taxTotal: {
						currencyCode: "EUR",
						amount: "66.05",
					},
					grandTotalAmount: "1009.65",
					paidAmount: "0.00",
					duePayableAmount: "1009.65",
				},
			},
		},
	};

	const invoice = await invoicer.create(data);

	console.log(await invoice.toXML());
};

void main();
