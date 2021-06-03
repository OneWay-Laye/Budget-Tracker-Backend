API="http://localhost:4741"
URL_PATH="/create-expense"

curl "${API}${URL_PATH}" \
--include \
--request POST \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "expense": {
    "company": "'"${COMPANY}"'",
    "amount": "'"${AMOUNT}"'",
    "due": "'"${DUE}"'"
  }
}'

echo
