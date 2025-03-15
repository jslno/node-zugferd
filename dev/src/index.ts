import { zugferd } from "node-zugferd";
import { MINIMUM, type ProfileMinimum } from "node-zugferd/profile/minimum";

const main = async () => {
	const invoicer = zugferd({
		profile: MINIMUM,
	});

	const data: ProfileMinimum = {
		businessProcessType: "A1",
		number: "INV-001",
		issueDate: new Date(),
		typeCode: "380",
		transaction: {
			tradeAgreement: {
				buyerReference: "buyerReference",
				seller: {
					name: "Lieferant GmbH",
					organization: {
						registrationIdentifier: {
							schemeIdentifier: "seller_legalOrganization_schemeIdentifier",
							value: "seller_legalOrganization_id",
						},
					},
					postalAddress: {
						countryCode: "DE",
					},
					taxRegistration: {
						localIdentifier: "201/113/40209",
						vatIdentifier: "DE123456789",
					},
				},
				buyer: {
					name: "Kunden AG Frankreich",
					organization: {
						registrationIdentifier: {
							schemeIdentifier: "buyer_legalOrganization_schemeIdentifier",
							value: "buyer_legalOrganization_id",
						},
					},
				},
				associatedOrder: {
					purchaseOrderReference: "purchaseOrderReference",
				},
			},
			tradeSettlement: {
				currencyCode: "EUR",
				monetarySummation: {
					taxBasisTotalAmount: "198.00",
					taxTotal: {
						currencyCode: "EUR",
						amount: "37.62",
					},
					grandTotalAmount: "235.62",
					duePayableAmount: "235.62",
				},
			},
		},
	};

	const invoice = await invoicer.create(data);

	console.log(invoice.toXML());
};

void main();
