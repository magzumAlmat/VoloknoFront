"use client";
import React, { useEffect, useState } from "react";
import logo from "/public/image/cable/cable_logo.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { FormControl, MenuItem, Select } from "@mui/material";
import {
  Phone,
  ShoppingBasket,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAllProductsReducer,
  getAllProductsAction,
  getAllProductsReducer,
  setSelectedMainTypeReducer,
  setSelectedTypeReducer,
} from "@/store/slices/productSlice";

export default function Header() {
  const clickCount = useSelector((state) => state.usercart.clickCount);
  const crossOptical = useSelector((state) => state.usercart.allProducts);
  const selectedMainType = useSelector(
    (state) => state.usercart.selectedMainType
  );

  const selectedType = useSelector((state) => state.usercart.selectedType);

  const dispatch = useDispatch();

  const uniqueMainTypes = [
    ...new Set(crossOptical.map((item) => item.mainType)),
  ];
  const uniqueTypes = selectedMainType
    ? [
        ...new Set(
          crossOptical
            .filter((item) => item.mainType === selectedMainType)
            .map((item) => item.type)
        ),
      ]
    : [];

  const router = useRouter();

  const buttonClick = () => {
    router.push("/cart");
  };

  const buttonClickHome = () => {
    router.push("/");
  };

  const handleNavItemClick = (mainType) => {
    dispatch(setSelectedMainTypeReducer(mainType));
    dispatch(setSelectedTypeReducer(""));
  };

  const handleTypeChange = (event) => {
    dispatch(setSelectedTypeReducer(event.target.value));
  };

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, []);

  return (
    <>
    <div className="width100">
      <div className="container phone d-flex gap-2 align-items-center p-2">
        <span id='slogan'>Мы работаем по всему Казахстану!</span>
        <a href="tel:+77779618253">
          <Phone color="primary" /> +7 (777) 961 82 53
        </a>
      </div>
      <header className="p-2 header mb-5">
        <div className="container d-flex align-items-center gap-1">
          <div className="header__left align-items-center d-flex gap-1">
            <Button onClick={buttonClickHome} className="btn">
              <div className="header__logo">
                <Image width="38" src={logo} alt="logo pizza" />
              </div>
            </Button>
            <Button onClick={buttonClickHome} className="btn">
              <div className="header__title">
                <div className="header__title-text">SCVolokno.kz</div>
                <div className="header__text">Cамые лучшие кабеля</div>
              </div>
            </Button>
          </div>
          <div className="d-flex gap-2 catalog" id='dropDownSelectCategory'>
            <FormControl
              sx={{
                minWidth: 120,
                color: "white",
                border: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "0 !important",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "0 !important",
                },
                "& .MuiSelect-icon": {
                  color: "white",
                  cursor: "pointer",
                },
              }}
            >
              <Select
                value={selectedMainType}
                onChange={(event) => handleNavItemClick(event.target.value)}
                displayEmpty
                sx={{
                  color: "white",
                  "& .MuiSelect-select": {
                    padding: "8px",
                    fontSize: "16px",
                    border: "0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  },
                }}
              >
                <MenuItem
                  value="Все товары"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <MenuIcon />Все</MenuItem>
                {uniqueMainTypes.map((uniqueItem) => (
                  <MenuItem key={uniqueItem} value={uniqueItem}>
                    {uniqueItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedMainType && (
              <FormControl id='subCategory'
                sx={{
                  maxWidth: 200,
                  color: "white",
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "0 !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "0 !important",
                  },
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                <Select
                  value={selectedType}
                  onChange={handleTypeChange}
                  displayEmpty
                  sx={{
                    color: "white",
                    "& .MuiSelect-select": {
                      padding: "8px",
                      fontSize: "16px",
                      border: "0",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    
                  </MenuItem>
                  <MenuItem value="">Все</MenuItem>
                  {uniqueTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
          <div className="header__right">
            {clickCount >= 1 ? (
              <Button className="CART"
                onClick={buttonClick}
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartOutlined />}
                style={{'color':'white'}}
              >
                <div id='CartTitle1'>Корзина</div>
                <div className="inMods"> </div>
                <div>{clickCount}</div>
              </Button>

            ) : (
              <Button className="CART"
                onClick={buttonClick}
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartOutlined />}
                style={{'color':'white'}}
              >
                <div className="d-flex gap-2 justify-content-center" id='CartTitle'>
                  Корзина
                </div>
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
    </>
  );
}
