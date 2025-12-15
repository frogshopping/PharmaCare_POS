package models

// Enums
type PackType string

const (
	PackTypeUnit  PackType = "unit"
	PackTypeStrip PackType = "strip"
	PackTypeBox   PackType = "box"
)

type StockChangeType string

const (
	StockChangePurchase       StockChangeType = "purchase"
	StockChangeSold           StockChangeType = "sold"
	StockChangeCompanyReturn  StockChangeType = "company_return"
	StockChangeCustomerReturn StockChangeType = "customer_return"
)

type InvoiceStatus string

const (
	InvoiceStatusPaid InvoiceStatus = "paid"
	InvoiceStatusDue  InvoiceStatus = "due"
)

type InvoiceType string

const (
	InvoiceTypeOutstanding InvoiceType = "outstanding"
	InvoiceTypeCash        InvoiceType = "cash"
)

type PurchaseStatus string

const (
	PurchaseStatusPaid    PurchaseStatus = "paid"
	PurchaseStatusDue     PurchaseStatus = "due"
	PurchaseStatusPartial PurchaseStatus = "partial"
)
