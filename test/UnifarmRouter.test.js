// const { use, expect } = require('chai')
// const { ethers, waffle } = require('hardhat')
// const { ecsign } = require('ethereumjs-util')
// const { getApprovalDigest } = require('./utils/utilities')
// const { solidity } = waffle

// use(solidity)
// const { MaxUint256 } = ethers.constants

// const { MockProvider, loadFixture, createFixtureLoader, deployContract } = require('ethereum-waffle')
// const IUniswapV2Pair  = require('../artifacts/contracts/UnifarmPair.sol/UnifarmPair.json')

// const {factoryFixture, pairFixture} = require('./utils/fixtures')
// const { expandTo18Decimals, MINIMUM_LIQUIDITY } = require('./utils/utilities') 

// const DeflatingERC20 = require('../build/UniswapV2ERC20.json') 

// const overrides = {
//   gasLimit: 9999999
// }

// const TOTAL_SUPPLY = 1000000

// describe('UniswapV2Router02', async () => {
//     let wallet, other, trustedForwarder

//   let token0
//   let token1
//   let router

//   beforeEach(async () => {
//     ;[wallet, other, trustedForwarder] = await ethers.getSigners()
//     // const Token = await ethers.getContractFactory('ERC20')
//     // token0 = await Token.deploy(TOTAL_SUPPLY)
//     // token1 = await Token.deploy(TOTAL_SUPPLY)
    
//     const provider = new MockProvider();
//     // const v2Fixture = createFixtureLoader(provider, [wallet])

//     const fixture = await loadFixture(pairFixture)
//     console.log(token0)
//     token0 = fixture.token0
//     console.log(token0)
//     token1 = fixture.token1 
//     router = fixture.router
//   })


//   it('quote', async () => {
//     expect(await router.quote(bigNumberify(1), bigNumberify(100), bigNumberify(200))).to.eq(bigNumberify(2))
//     expect(await router.quote(bigNumberify(2), bigNumberify(200), bigNumberify(100))).to.eq(bigNumberify(1))
//     await expect(router.quote(bigNumberify(0), bigNumberify(100), bigNumberify(200))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_AMOUNT'
//     )
//     await expect(router.quote(bigNumberify(1), bigNumberify(0), bigNumberify(200))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_LIQUIDITY'
//     )
//     await expect(router.quote(bigNumberify(1), bigNumberify(100), bigNumberify(0))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_LIQUIDITY'
//     )
//   })

//   it('getAmountOut', async () => {
//     expect(await router.getAmountOut(bigNumberify(2), bigNumberify(100), bigNumberify(100))).to.eq(bigNumberify(1))
//     await expect(router.getAmountOut(bigNumberify(0), bigNumberify(100), bigNumberify(100))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT'
//     )
//     await expect(router.getAmountOut(bigNumberify(2), bigNumberify(0), bigNumberify(100))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_LIQUIDITY'
//     )
//     await expect(router.getAmountOut(bigNumberify(2), bigNumberify(100), bigNumberify(0))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_LIQUIDITY'
//     )
//   })

//   it('getAmountIn', async () => {
//     expect(await router.getAmountIn(bigNumberify(1), bigNumberify(100), bigNumberify(100))).to.eq(bigNumberify(2))
//     await expect(router.getAmountIn(bigNumberify(0), bigNumberify(100), bigNumberify(100))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT'
//     )
//     await expect(router.getAmountIn(bigNumberify(1), bigNumberify(0), bigNumberify(100))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_LIQUIDITY'
//     )
//     await expect(router.getAmountIn(bigNumberify(1), bigNumberify(100), bigNumberify(0))).to.be.revertedWith(
//       'UniswapV2Library: INSUFFICIENT_LIQUIDITY'
//     )
//   })

//   it('getAmountsOut', async () => {
//     await token0.approve(router.address, MaxUint256)
//     await token1.approve(router.address, MaxUint256)
//     await router.addLiquidity(
//       token0.address,
//       token1.address,
//       bigNumberify(10000),
//       bigNumberify(10000),
//       0,
//       0,
//       wallet.address,
//       MaxUint256,
//       overrides
//     )

//     await expect(router.getAmountsOut(bigNumberify(2), [token0.address])).to.be.revertedWith(
//       'UniswapV2Library: INVALID_PATH'
//     )
//     const path = [token0.address, token1.address]
//     expect(await router.getAmountsOut(bigNumberify(2), path)).to.deep.eq([bigNumberify(2), bigNumberify(1)])
//   })

//   it('getAmountsIn', async () => {
//     await token0.approve(router.address, MaxUint256)
//     await token1.approve(router.address, MaxUint256)
//     await router.addLiquidity(
//       token0.address,
//       token1.address,
//       bigNumberify(10000),
//       bigNumberify(10000),
//       0,
//       0,
//       wallet.address,
//       MaxUint256,
//       overrides
//     )

//     await expect(router.getAmountsIn(bigNumberify(1), [token0.address])).to.be.revertedWith(
//       'UniswapV2Library: INVALID_PATH'
//     )
//     const path = [token0.address, token1.address]
//     expect(await router.getAmountsIn(bigNumberify(1), path)).to.deep.eq([bigNumberify(2), bigNumberify(1)])
//   })
// })

// describe('fee-on-transfer tokens', async () => {
//  const [wallet] = await ethers.getSigners()
//   const loadFixture = createFixtureLoader(provider, [wallet])

//   let DTT
//   let WETH
//   let router
//   let pair
//   beforeEach(async function() {
//     const fixture = await loadFixture(factoryFixture)

//     WETH = fixture.WETH
//     router = fixture.router02

//     DTT = await deployContract(wallet, DeflatingERC20, [expandTo18Decimals(10000)])

//     // make a DTT<>WETH pair
//     await fixture.factoryV2.createPair(DTT.address, WETH.address)
//     const pairAddress = await fixture.factoryV2.getPair(DTT.address, WETH.address)
//     pair = new Contract(pairAddress, JSON.stringify(IUniswapV2Pair.abi), provider).connect(wallet)
//   })

//   afterEach(async function() {
//     expect(await provider.getBalance(router.address)).to.eq(0)
//   })

//   async function addLiquidity(DTTAmount, WETHAmount) {
//     await DTT.approve(router.address, MaxUint256)
//     await router.addLiquidityETH(DTT.address, DTTAmount, DTTAmount, WETHAmount, wallet.address, MaxUint256, {
//       ...overrides,
//       value: WETHAmount
//     })
//   }

//   it('removeLiquidityETHSupportingFeeOnTransferTokens', async () => {
//     const DTTAmount = expandTo18Decimals(1)
//     const ETHAmount = expandTo18Decimals(4)
//     await addLiquidity(DTTAmount, ETHAmount)

//     const DTTInPair = await DTT.balanceOf(pair.address)
//     const WETHInPair = await WETH.balanceOf(pair.address)
//     const liquidity = await pair.balanceOf(wallet.address)
//     const totalSupply = await pair.totalSupply()
//     const NaiveDTTExpected = DTTInPair.mul(liquidity).div(totalSupply)
//     const WETHExpected = WETHInPair.mul(liquidity).div(totalSupply)

//     await pair.approve(router.address, MaxUint256)
//     await router.removeLiquidityETHSupportingFeeOnTransferTokens(
//       DTT.address,
//       liquidity,
//       NaiveDTTExpected,
//       WETHExpected,
//       wallet.address,
//       MaxUint256,
//       overrides
//     )
//   })

//   it('removeLiquidityETHWithPermitSupportingFeeOnTransferTokens', async () => {
//     const DTTAmount = expandTo18Decimals(1)
//       .mul(100)
//       .div(99)
//     const ETHAmount = expandTo18Decimals(4)
//     await addLiquidity(DTTAmount, ETHAmount)

//     const expectedLiquidity = expandTo18Decimals(2)

//     const nonce = await pair.nonces(wallet.address)
//     const digest = await getApprovalDigest(
//       pair,
//       { owner: wallet.address, spender: router.address, value: expectedLiquidity.sub(MINIMUM_LIQUIDITY) },
//       nonce,
//       MaxUint256
//     )
//     const { v, r, s } = ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(wallet.privateKey.slice(2), 'hex'))

//     const DTTInPair = await DTT.balanceOf(pair.address)
//     const WETHInPair = await WETH.balanceOf(pair.address)
//     const liquidity = await pair.balanceOf(wallet.address)
//     const totalSupply = await pair.totalSupply()
//     const NaiveDTTExpected = DTTInPair.mul(liquidity).div(totalSupply)
//     const WETHExpected = WETHInPair.mul(liquidity).div(totalSupply)

//     await pair.approve(router.address, MaxUint256)
//     await router.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
//       DTT.address,
//       liquidity,
//       NaiveDTTExpected,
//       WETHExpected,
//       wallet.address,
//       MaxUint256,
//       false,
//       v,
//       r,
//       s,
//       overrides
//     )
//   })

//   describe('swapExactTokensForTokensSupportingFeeOnTransferTokens', () => {
//     const DTTAmount = expandTo18Decimals(5)
//       .mul(100)
//       .div(99)
//     const ETHAmount = expandTo18Decimals(10)
//     const amountIn = expandTo18Decimals(1)

//     beforeEach(async () => {
//       await addLiquidity(DTTAmount, ETHAmount)
//     })

//     it('DTT -> WETH', async () => {
//       await DTT.approve(router.address, MaxUint256)

//       await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
//         amountIn,
//         0,
//         [DTT.address, WETH.address],
//         wallet.address,
//         MaxUint256,
//         overrides
//       )
//     })

//     // WETH -> DTT
//     it('WETH -> DTT', async () => {
//       await WETH.deposit({ value: amountIn }) // mint WETH
//       await WETH.approve(router.address, MaxUint256)

//       await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
//         amountIn,
//         0,
//         [WETH.address, DTT.address],
//         wallet.address,
//         MaxUint256,
//         overrides
//       )
//     })
//   })

//   // ETH -> DTT
//   it('swapExactETHForTokensSupportingFeeOnTransferTokens', async () => {
//     const DTTAmount = expandTo18Decimals(10)
//       .mul(100)
//       .div(99)
//     const ETHAmount = expandTo18Decimals(5)
//     const swapAmount = expandTo18Decimals(1)
//     await addLiquidity(DTTAmount, ETHAmount)

//     await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
//       0,
//       [WETH.address, DTT.address],
//       wallet.address,
//       MaxUint256,
//       {
//         ...overrides,
//         value: swapAmount
//       }
//     )
//   })

//   // DTT -> ETH
//   it('swapExactTokensForETHSupportingFeeOnTransferTokens', async () => {
//     const DTTAmount = expandTo18Decimals(5)
//       .mul(100)
//       .div(99)
//     const ETHAmount = expandTo18Decimals(10)
//     const swapAmount = expandTo18Decimals(1)

//     await addLiquidity(DTTAmount, ETHAmount)
//     await DTT.approve(router.address, MaxUint256)

//     await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
//       swapAmount,
//       0,
//       [DTT.address, WETH.address],
//       wallet.address,
//       MaxUint256,
//       overrides
//     )
//   })
// })

// describe('fee-on-transfer tokens: reloaded', async () => {
//   // const provider = new MockProvider({
//   //   hardfork: 'istanbul',
//   //   mnemonic: '',
//   //   gasLimit: 9999999
//   // })

  
//   const [wallet] = await ethers.getSigners()
//   // const loadFixture = createFixtureLoader(provider, [wallet])

//   let DTT
//   let DTT2
//   let router

//   beforeEach(async function() {
//     // const v2Fixture = createFixtureLoader(provider, [wallet])
//     const fixture = await loadFixture(pairFixture)
//     const provider = new MockProvider();
//     router = fixture.router
//     console.log(router.address)
//     DTT = await deployContract(wallet, DeflatingERC20, [expandTo18Decimals(10000)])
//     DTT2 = await deployContract(wallet, DeflatingERC20, [expandTo18Decimals(10000)])

//     // make a DTT<>WETH pair
//     await fixture.factoryV2.createPair(DTT.address, DTT2.address)
//     const pairAddress = await fixture.factoryV2.getPair(DTT.address, DTT2.address)
//   })

//   afterEach(async function() {
//     expect(await provider.getBalance(router.address)).to.eq(0)
//   })

//   async function addLiquidity(DTTAmount, DTT2Amount) {
//     await DTT.approve(router.address, MaxUint256)
//     await DTT2.approve(router.address, MaxUint256)
//     await router.addLiquidity(
//       DTT.address,
//       DTT2.address,
//       DTTAmount,
//       DTT2Amount,
//       DTTAmount,
//       DTT2Amount,
//       wallet.address,
//       MaxUint256,
//       overrides
//     )
//   }

//   describe('swapExactTokensForTokensSupportingFeeOnTransferTokens', () => {
//     const DTTAmount = expandTo18Decimals(5)
//       .mul(100)
//       .div(99)
//     const DTT2Amount = expandTo18Decimals(5)
//     const amountIn = expandTo18Decimals(1)

//     beforeEach(async () => {
//       await addLiquidity(DTTAmount, DTT2Amount)
//     })

//     it('DTT -> DTT2', async () => {
//       await DTT.approve(router.address, MaxUint256)

//       await router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
//         amountIn,
//         0,
//         [DTT.address, DTT2.address],
//         wallet.address,
//         MaxUint256,
//         overrides
//       )
//     })
//   })
// })
