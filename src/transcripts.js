const text = {};

export const initText = () => {
  text["us"] = {}
  text["gr"] = {}

  text["gr"]["title"] = "Easel Clothing"
  text["gr"]["add_cart"] = "Προσθήκη στο καλάθι"
  text["gr"]["main_title"] = "Τα προϊόντα"
  text["gr"]["products"] = "Προϊόντα"
  text["gr"]["cart"] = "Το καλάθι μου"
  text["gr"]["login"] = "Σύνδεση"
  text["gr"]["password"] = "Κωδικός"
  text["gr"]["register"] = "Εγγραφή"
  text["gr"]["available"] = "Διαθέσιμα"
  text["gr"]["clearcart"] = "Εκκαθάριση καλαθιού"
  text["gr"]["clearcart"] = "Ολοκλήρωση αγοράς"
  text["gr"]["noitemincart"] = "Δεν υπάρχουν αντικείμενα στο καλάθι!"
  text["gr"]["fullname"] = "Ονοματεπώνυμο"
  text["gr"]["shipping_adress"] = "Διεύθυνση κατοικίας"
  text["gr"]["city"] = "Πόλη"
  text["gr"]["province"] = "Επαρχία"
  text["gr"]["postalcode"] = "Ταχυδρομικός Κώδικας"
  text["gr"]["phone"] = "Τηλέφωνο"
  text["gr"]["apt"] = "Διαμέρισμα"
  text["gr"]["shipping method"] = "Μέθοδος αποστολής "
  text["gr"]["normal"] = "Κανονική"
  text["gr"]["fast"] = "Γρήγορη"
  text["gr"]["shipment_amount"] = "Ποσό μεταφορικών εξόδων"
  text["gr"]["this_is_a_gift"] = "Είναι για ΄δωρο;"
  text["gr"]["Yes"] = "Ναι"
  text["gr"]["No"] = "Όχι"
  text["gr"]["Ethereum_adress"] = "Διεύθυνση Ethereum"
  text["gr"]["Clothe NFT will be sent there"] = "To NFT του προϊόντος θα σταλεί εκεί"
  text["gr"]["optional"] = "Προαιρετικό"
  text["gr"]["Invoice"] = "Τιμολόγιο"
  text["gr"]["payment_method"] = "Τρόπος πληρωμής"
  text["gr"]["Debit / Credit Card"] = "Χρεωστική / Πιστωτική Κάρτα"
  text["gr"]["Product's Amount"] = "Ποσότητα προϊόντος"
  text["gr"]["Total Amount"] = "Σύνολο ποσού"

  //====================
  text["us"]["title"] = "Easel Clothing"
  text["us"]["add_cart"] = "Add to Cart"
  text["us"]["main_title"] = "Our Products"
  text["us"]["products"] = "Products"
  text["us"]["cart"] = "Cart"
  text["us"]["Login"] = "Login"
  text["us"]["password"] = "Password"
  text["us"]["register"] = "Register"
  text["us"]["available"] = "Available"
  text["us"]["clearcart"] = "Clear cart"
  text["us"]["clearcart"] = "Checkout"
  text["us"]["noitemincart"] = "No items in cart!"
  text["us"]["fullname"] = "Full Name"
  text["us"]["shipping_adress"] = "Shipping Adress"
  text["us"]["city"] = "City"
  text["us"]["province"] = "Province"
  text["us"]["postalcode"] = "Postal Code"
  text["us"]["phone"] = "Phone number"
  text["us"]["apt"] = "Apartment "
  text["us"]["shipping method"] = "Shipping Method"
  text["us"]["normal"] = "Normal"
  text["us"]["fast"] = "Fast"
  text["us"]["shipment_amount"] = "Shippment Amount"
  text["us"]["this_is_a_gift"] = "This is a gift"
  text["us"]["Yes"] = "Yes"
  text["us"]["No"] = "No"
  text["us"]["Ethereum_adress"] = "Ethereum Adress"
  text["us"]["Clothe NFT will be sent there"] = "Clothe NFT will be sent there"
  text["us"]["optional"] = "Optional"
  text["us"]["Invoice"] = "Invoice"
  text["us"]["payment_method"] = "Payment Method"
  text["us"]["Debit / Credit Card"] = "Debit / Credit Card"
  text["us"]["Product's Amount"] = "Product's Amount"
  text["us"]["Total Amount"] = "Total Amount"
};

export default function getText(lang, id) {
  return text[lang][id];
}
