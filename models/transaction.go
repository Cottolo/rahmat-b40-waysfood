package models

type Transaction struct {
	ID        int                        `json:"id" gorm:"primary_key:auto_increment"`
	Qty       int                        `json:"qty"`
	UsersID   int                        `json:"user_id"`
	Users     UsersProfileResponse       `json:"users"`
	Status    string                     `json:"status"`
	ProductID int                        `json:"products_id" `
	Product   ProductTransactionResponse `json:"product"`
}
