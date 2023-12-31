# export base url in bash session
export API_BASE_URL=http://localhost:3000

# create a new issue
curl -X POST -H "Content-Type: application/json" -d '{"title":"issue title","description":"issue descrition"}' $API_BASE_URL/api/issues

# for update issue
curl -X PATCH -H "Content-Type: application/json" -d '{"title":"title updated","description":"desc"}' $API_BASE_URL/api/issues/1

# Update the base URL if needed:
export API_BASE_URL=http://new-url:port
