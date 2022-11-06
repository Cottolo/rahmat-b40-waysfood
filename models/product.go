package models

import "time"

type Product struct {
	ID          int                  `json:"id" gorm:"primary_key:auto_increment"`
	ProductName string               `json:"product_name" form:"name" gorm:"type: varchar(255)"`
	Desc        string               `json:"desc" gorm:"type:varchar(255)" form:"desc"`
	Price       int                  `json:"price" form:"price" gorm:"type: int"`
	Image       string               `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty         int                  `json:"qty" form:"qty"`
	UserID      int                  `json:"user_id" form:"user_id"`
	User        UsersProfileResponse `json:"user"`
	Category    []Category           `json:"category" gorm:"many2many:product_categories"`
	CategoryID  []int                `json:"category_id" form:"category_id" gorm:"-"`
	CreatedAt   time.Time            `json:"-"`
	UpdatedAt   time.Time            `json:"-"`
}

type ProductResponse struct {
	ID          int                  `json:"id"`
	ProductName string               `json:"product_name"`
	Desc        string               `json:"desc"`
	Price       int                  `json:"price"`
	Image       string               `json:"image"`
	Qty         int                  `json:"qty"`
	UserID      int                  `json:"-"`
	User        UsersProfileResponse `json:"user"`
	Category    []Category           `json:"category" gorm:"many2many:product_categories"`
	CategoryID  []int                `json:"category_id" form:"category_id" gorm:"-"`
}

type ProductUserResponse struct {
	ID          int    `json:"id"`
	ProductName string `json:"product_name"`
	Desc        string `json:"desc"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
	Qty         int    `json:"qty"`
	UserID      int    `json:"-"`
}

type ProductTransactionResponse struct {
	ID          int    `json:"id"`
	ProductName string `json:"product_name"`
	Desc        string `json:"desc"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
}

func (ProductResponse) TableName() string {
	return "products"
}

func (ProductUserResponse) TableName() string {
	return "products"
}

func (ProductTransactionResponse) TableName() string {
	return "products"
}
