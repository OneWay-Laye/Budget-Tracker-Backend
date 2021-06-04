API="http://localhost:4741"
URL_PATH="/expense"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request DELETE \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}"
