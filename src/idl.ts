export const idl = {
  version: "0.1.0",
  name: "token_control",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "basemint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dataAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "timestamp",
          type: "string",
        },
      ],
      returns: null,
    },
    {
      name: "proxMint",
      accounts: [
        {
          name: "basemint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "baseAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dataAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "timestamp",
          type: "string",
        },
        {
          name: "vaultBump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
      returns: null,
    },
    {
      name: "proxBurn",
      accounts: [
        {
          name: "basemint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "baseAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dataAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vestAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "derAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "timestamp",
          type: "string",
        },
        {
          name: "vaultBump",
          type: "u8",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
      returns: null,
    },
  ],
  accounts: [
    {
      name: "MintdAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mintkey",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "TimestampMismatch",
    },
    {
      code: 6001,
      name: "VestTimeNotEnded",
    },
  ],
  metadata: {
    address: "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS",
  },
};
