// const { utils } = require("ethers").utils;
// const { expect } = require("chai");
// const { ethers, waffle, solidity } = require("hardhat");
// const { expectRevert, time, BN } = require('@openzeppelin/test-helpers');
// const { deployContract } = waffle;

// describe(
//     "Mimir contract waffle/chai/ethers test",
//     function () {


//         // Wallets
//         let owner;
//         let newOwner;
//         let buyer1;
//         let buyer2;

//         let MimirBondingCurveSaleContract;
//         let mimirBondingCurveSale;

//         let MimirContract;
//         let mimir;

//         beforeEach(
//             async function () {
//                 [
//                     owner,
//                     newOwner,
//                     buyer1,
//                     buyer2
//                 ] = await ethers.getSigners();

//                 MimirBondingCurveSaleContract = await ethers.getContractFactory("MimirBondingCurveSale");

//                 sale = await MimirBondingCurveSaleContract.connect( owner ).deploy();

//                 MimirContract = await ethers.getContractFactory("MimirToken");

//                 mimir = await MimirContract.connect( owner ).deploy();
//             }
//         );

//         describe(
//             "Deployment",
//             function () {
//                 it( 
//                     "DeploymentSuccess", 
//                     async function() {
//                         console.log("Deployment::DeploymentSuccess: token name.");
//                         expect( await mimir.name() ).to.equal("Mimir Solutions");
//                         console.log("Deployment::DeploymentSuccess: token symbol.");
//                         expect( await mimir.symbol() ).to.equal("MIMIR");
//                         console.log("Deployment::DeploymentSuccess: token decimals.");
//                         expect( await mimir.decimals() ).to.equal(18);
//                         console.log("Deployment::DeploymentSuccess: token totalSupply.");
//                         expect( await mimir.totalSupply() ).to.equal( ethers.utils.parseEther( String( 10000 ) ) );
//                         console.log("Deployment::DeploymentSuccess: owner.");
//                         expect( await mimir.owner() ).to.equal(owner.address);
//                         expect( await mimir.connect(owner).balanceOf(owner.address) ).to.equal( ethers.utils.parseEther( String( 10000 ) ) );
//                         expect( await mimir.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
//                         expect( await mimir.connect(buyer2).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
//                         expect( await mimir.connect(buyer2).balanceOf(buyer2.address) ).to.equal( String( 0 ) );
//                         expect( await mimir.connect(buyer1).balanceOf(buyer2.address) ).to.equal( String( 0 ) );
//                     }
//                 );
//             }
//         );

//         describe(
//             "Buy MIMIR.",
//             function () {
//                 it(
//                     "Try to buy MIMIR.",
//                     async function() {

//                         await expect( mimir.connect(owner).transfer(sale.address, ethers.utils.parseEther( String( 5000 ) ) ) );
//                         expect( await mimir.connect(owner).balanceOf(owner.address) ).to.equal( ethers.utils.parseEther( String( 5000 ) ) );
//                         expect( await mimir.connect(owner).balanceOf(sale.address) ).to.equal( ethers.utils.parseEther( String( 5000 ) ) );
                        
//                         var buy1Amount = 1;
//                         var buy2Amount = 2;

//                         await expect( sale.connect(owner).setTokenForSale( mimir.address ) );

//                         await expect( sale.connect(owner).startSale() ).to.emit(sale,"SaleStarted");
                        
//                         expect( await buyer1.transfer( { value: ethers.utils.parseEther( String( buy1Amount ) ) }, sale.address ) );
//                         expect( await buyer2.transfer( { value: ethers.utils.parseEther( String( buy2Amount ) ) }, sale.address ) );

//                         // expect( await mimir.connect(buyer2).buymimir( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );

//                         // expect( await mimir.connect(buyer3).buymimir( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
//                         // expect( await mimir.connect(buyer3).withdrawPaidETHForfietAllmimir() );

//                         // await expect( mimir.connect(owner).endQPLGME() ).to.emit(mimir, "QPLGMEEnded");
                        
//                         // expect( await weth.balanceOf(charity.address)).to.equal( String( 0 ) );

//                         // await expect( mimir.connect(buyer1).collectmimirFromQPLGME() );
//                         // expect( await mimir.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 7071067810000000000 ) );
//                         // expect( await weth.balanceOf(charity.address)).to.equal( String( 300000000000000000 ) );

//                         // await expect( mimir.connect(buyer2).collectmimirFromQPLGME() );
//                         // expect( await mimir.connect(buyer2).balanceOf(buyer2.address) ).to.equal( String( 10000000000000000000 ) );

//                         // await expect( mimir.connect(buyer1).collectmimirFromQPLGME() );
//                         // expect( await mimir.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 7071067810000000000 ) );
                        
//                         // await expect( mimir.connect(buyer3).collectmimirFromQPLGME() );
//                         // expect( await mimir.connect(buyer3).balanceOf(buyer3.address) ).to.equal( String( 0 ) );

//                     }
//                 );
//             }
//         );

//         // describe(
//         //     "Complete QPLGME.",
//         //     function () {
//         //         it(
//         //             "Try to transfer mimir.",
//         //             async function() {
                        
//         //                 var buy1Amount = 750;

//         //                 //console.log( "Starting QPLGME.");
//         //                 await expect( mimir.connect(owner).startQPLGME() ).to.emit(mimir,"QPLGMEStarted").withArgs( await mimir.qplgmeActive(), await mimir.qplgmeStartTimestamp());
//         //                 //console.log("Confirming QPLGME is active.");
//         //                 expect( await mimir.qplgmeActive() ).to.equal(true);
//         //                 //console.log("Confirming mimir totalsupply.");
//         //                 expect( await mimir.totalSupply() ).to.equal( String( 0 ) );
                        
//         //                 //console.log("Buying mimir.");
//         //                 expect( await mimir.connect(buyer1).buymimir( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
//         //                 // expect( ethers.utils.parseUnits( String( await  buyer1.getBalance() ), "gwei" ) ).to.equal( ethers.utils.parseUnits( String( 9998997990712000000000 ), "gwei" ) );
                        
//         //                 expect( await mimir.connect(buyer2).buymimir( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
//         //                 // expect( await buyer1.getBalance() ).to.equal( String( 9998997990712000000000 ) );
//         //                 // expect( await mimir.connect(buyer2).buymimir( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
//         //                 // expect( await buyer1.getBalance() ).to.equal( String( 9998997990712000000000 ) );

//         //                 expect( await mimir.connect(buyer3).buymimir( { value: ethers.utils.parseEther( String( buy1Amount ) ) } ) );
//         //                 // expect( await buyer1.getBalance() ).to.equal( String( 9998997990712000000000 ) );
//         //                 expect( await mimir.connect(buyer3).withdrawPaidETHForfietAllmimir() );
//         //                 // expect( await buyer1.getBalance() ).to.equal( String( 1000000000000000000000 ) );

//         //                 await expect( mimir.connect(owner).endQPLGME() ).to.emit(mimir, "QPLGMEEnded");
                        
//         //                 expect( await weth.balanceOf(charity.address)).to.equal( String( 0 ) );

//         //                 await expect( mimir.connect(buyer1).collectmimirFromQPLGME() );
//         //                 expect( await mimir.connect(buyer1).balanceOf(buyer1.address) )
//         //                     //.to.equal( String( 7071067810000000000 ) )
//         //                     ;
//         //                 // expect( await mimir.totalSupply() ).to.equal( String( 1676392616930000000000 ) );
//         //                 // expect( await mimir.connect(owner).balanceOf(owner.address) ).to.equal( String( 0 ) );
//         //                 // expect( await mimir.connect(owner).balanceOf(charity.address) ).to.equal( String( 0 ) );
//         //                 // expect( await mimir.connect(owner).balanceOf( mimir.uniswapV2mimirWETHDEXPairAddress() ) ).to.equal( String( 0 ) );
//         //                 // expect( await mimir.connect(owner).totalExchangemimirReserve() ).to.equal( String( 0 ) );
//         //                 // expect( await mimir.connect(owner).balanceOf( mimir.address ) ).to.equal( String( 0 ) );
//         //                 expect( await weth.balanceOf(charity.address))
//         //                     //.to.equal( String( 300000000000000000 ) )
//         //                     // ;

//         //                 await expect( mimir.connect(buyer2).collectmimirFromQPLGME() );
//         //                 expect( await mimir.connect(buyer2).balanceOf(buyer2.address) )
//         //                     //.to.equal( String( 10000000000000000000 ) )
//         //                     ;

//         //                 await expect( mimir.connect(buyer1).collectmimirFromQPLGME() );
//         //                 expect( await mimir.connect(buyer1).balanceOf(buyer1.address) )
//         //                     //.to.equal( String( 7071067810000000000 ) )
//         //                     ;
                        
//         //                 await expect( mimir.connect(buyer3).collectmimirFromQPLGME() );
//         //                 expect( await mimir.connect(buyer3).balanceOf(buyer3.address) )
//         //                     //.to.equal( String( 0 ) )
//         //                     ;

//         //                 //console.log("Confirming buyer1 can transfer %s.", ethers.utils.parseUnits( String( 217944947175000000000 ), "wei" ) );
//         //                 await expect( mimir.connect(buyer1).transfer(buyer2.address, 217944947175000000000) );
//         //                 // expect( await mimir.connect(buyer1).balanceOf(buyer1.address) ).to.equal( String( 0 ) );
//         //                 // expect( await mimir.connect(buyer2).balanceOf(buyer2.address) ).to.equal( String( 437160310264880370000 ) );
//         //                 // expect( await mimir.connect(buyer1).balanceOf(mimir.address) ).to.equal( String( 0 ) );

                        
//         //             }
//         //         );
//         //     }
//         // );
//     }
// );