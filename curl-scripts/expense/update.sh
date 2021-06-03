API="http://localhost:4741"
URL_PATH="/update-expense"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request PATCH \
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
