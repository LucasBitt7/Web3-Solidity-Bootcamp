// SPDX-License-Identifier: UNLICENSED
// Version of Solidity compiler this program was written for
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract VolcanoCoin is ERC20, Ownable, AccessControl {
    
    mapping(address => Payment[]) payments;

    uint index = 0;

    enum paymentType {
        unknown,
        basicPayment,
        refund,
        dividend,
        groupPayment
    }
    
    struct Payment {
      uint id ;
      address recipient;
      uint256 amount;
      paymentType typePayment;
      string comment;
      uint timestamp;
    }

     
    constructor() ERC20("VolcanoCoin", "VOLC") {
      _mint(_msgSender(), 10000);
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
     
    function mintToOwner(uint256 _amount) public onlyOwner {
      _mint(_msgSender(), _amount);
    }
    
    function transfer(address recipient, uint256 _amount) public override returns (bool) {
      _transfer(_msgSender(), recipient, _amount);
      addPayment(_msgSender(), recipient, _amount);
      return true;
    }
    
    function addPayment(address _sender, address _receiver, uint256 _amount) internal {
      payments[_sender].push(Payment({
          id: index,
          recipient: _receiver,
          amount: _amount,
          typePayment: paymentType.unknown,
          comment: "",
          timestamp: block.timestamp
          
          }));

      index++;
    }

    function getPayments(address _user) public view returns(Payment[] memory) {
      return payments[_user];
    }
        function _updatePayment (address _user, uint _id,  paymentType _type, string memory _comment ) public  {
      require(payments[_user][_id].timestamp != 0 , "payment-not-found");
      Payment storage payment = payments[_user][_id];
      payment.typePayment = _type;
      payment.comment = _comment;
    }

    function updatePayment(uint _id,  paymentType _type, string memory _comment ) public {
      _updatePayment(msg.sender, _id, _type, _comment);
    }

    function updatePaymentAdm (uint _user, uint _id,  paymentType _type, string memory _comment ) public onlyRole(DEFAULT_ADMIN_ROLE) {
      string memory updateBy = " update by ";
      string memory comment = append(
        _comment, updateBy, addressToString(msg.sender));
          _updatePayment(msg.sender, _id, _type, comment);
    }
    function append( string memory a, string memory b, string memory c) internal pure returns (string memory) {
      return string(abi.encodePacked(a,b,c));
    }
    function addressToString( address x) internal pure returns (string memory) {
      bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
      return string(s);
    }
  function char(bytes1 b) internal pure returns ( bytes1 c)  {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
  }
}
