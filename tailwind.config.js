module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primary-green": {
					100: "#F1FAF2",
					200: "#CCF075",
					300: "#8DBC1A",
					400: "#599504",
					500: "#3D6C00",
				},
				fuscia: "#DD51C6",
				cyan: "#19EBD2",
				azure: "#365CF0",
				greyborder: "#2a383c",
				tradeTitle: "#83A1A9",
				"error-color": {
					100: "#FBDAE1",
					200: "#F27D95",
					300: "#EE4F70",
					400: "#E52D54",
					500: "#8B0E28",
				},
				"success-color": {
					50: "#F0F7F1",
					100: "#F1FFF6",
					200: "#B6E2C5",
					300: "#7FE7A3",
					400: "#00A624",
					500: "#239249",
				},
				"warning-color": {
					100: "#FFFDF1",
					200: "#F8E696",
					300: "#F4D565",
					400: "#E8A23A",
					500: "#A75822",
				},
				dark: {
					100: "#2C432E",
					200: "#2A3B3F",
					300: "#191D21",
					400: "#FAFAFA",
				},
			},
			textColor: {
				blizzard: "#19EBD2",
				greenlabel: "#6348CA",
				greylabel: "#A6A6A6",
				greylabel2: "#B3B3B3",
				greyText: "#3f3f3f",
				darkText: "#2F3137",
			},
			backgroundImage: {
				vesting: "url('assets/vesting-bg.png')",
			},
			fontSize: {
				"title-1": "84px",
				"display-1": "72px",
				"display-2": "64px",
				"heading-1": "42px",
				"heading-2": "32px",
				subheading: "26px",
				"paragraph-1": "21px",
				"paragraph-2": "18px",
				"caption-1": "16px",
				"caption-2": "14px",
				"caption-3": "12px",
				"10px": "10px",
				"caption-4": "9px",
				"54px": "54px",
				"58px": "58px",
				"50px": "50px",
				"60px": "60px",
				"40px": "40px",
			},
			lineHeight: {
				"title-1": "90px",
				"display-1": "82px",
				"display-2": "72px",
				"lh-64": "64px",
				"lh-54": "54px",
				"heading-1": "46px",
				"heading-2": "34px",
				subheading: "34px",
				"paragraph-1": "28px",
				"paragraph-2": "25px",
				"caption-1": "22px",
				"caption-2": "20px",
				"caption-3": "16px",
				"caption-4": "12px",
			},
			boxShadow: {
				"input-validated": "0px 2px 20px rgba(80, 182, 0, 0.3)",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			width: {
				"fit-content": "fit-content",
				"20v": "20vw",
				"21v": "21vw",
				"22v": "22vw",
				"23v": "23vw",
				"24v": "24vw",
				"25v": "25vw",
				"26v": "26vw",
				"27v": "27vw",
				"28v": "28vw",
				"29v": "29vw",
				"30v": "30vw",
				"31v": "31vw",
				"35v": "35vw",
				"40v": "40vw",
				"42v": "42vw",
				"45v": "45vw",
				"47v": "47vw",
				"70v": "70vw",
				"62v": "62vw",
				"80v": "80vw",
				"72v": "72vw",
				"73v": "73vw",
				"50v": "50vw",
				"52v": "52vw",
				"55v": "55vw",
				"60v": "60vw",
				"65v": "65vw",
				"75v": "75vw",
				"90v": "90vw",
				"22p": "22%",
				"78p": "78%",
				"23p": "23%",
				"77p": "77%",
				"24p": "24%",
				"76p": "76%",
				"90p": "90%",
				"94p": "94%",
				"95p": "95%",
				"85p": "85%",
			},
			height: {
				"fit-content": "fit-content",
				"70v": "70vh",
				"6ov": "62vh",
				"35v": "35vh",
				"45v": "45vh",
				"100v": "100vh",
			},
			maxHeight: {
				"fit-content": "fit-content",
				"70v": "70vh",
				"6ov": "62vh",
				"35v": "35vh",
				"45v": "45vh",
			},
			minHeight: {
				"fit-content": "fit-content",
				"70v": "70vh",
				"6ov": "62vh",
				"35v": "35vh",
				"45v": "45vh",
				"96px": "96px",
				"80px": "80px",
				"100px": "100px",
				"120px": "120px",
				"140px": "140px",
				"160px": "160px",
				"180px": "180px",
				"200px": "200px",
				"360px": "360px",
				"350px": "350px",
				"370px": "370px",
				"380px": "380px",
			},
			screens: {
				phone: "320px",
				tablet: "768px",
				laptop: "1024px",
				screen: "1280px",
				desktop: "1440px",
				twok: "1920px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
