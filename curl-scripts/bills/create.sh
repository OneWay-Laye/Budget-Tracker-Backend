API="http://localhost:4741"
URL_PATH="/create-bill"

curl "${API}${URL_PATH}" \
--include \
--request POST \
--header "Content-Type: application/json" \
--data '{
  "bill": {
    "company": "'"${COMPANY}"'",
    "amount": "'"${AMOUNT}"'",
    "due": "'"${DUE}"'"
  }
}'

echo
