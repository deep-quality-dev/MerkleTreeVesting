export interface VestingConfig {
  start: number;
  cliff: number;
  duration: number;
  token: string;
  merkleRoot: string;
}

export const config: VestingConfig = {
  start: 7929973,
  cliff: 10,
  duration: 100,
  token: "0xE2d0fE9a39e7a7aa2791F43E476aD3314449F568",
  merkleRoot:
    "0x6e5b3877dc2af6fa275f85de82e2eb9b925b5b1642edaa4ace8a1dccf6e60301",
};
