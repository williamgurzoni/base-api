function MESSAGE_SUCCESS(message) {
  return { data: [], error: [], message: message || "Sccess" };
}

function MESSAGE_ERROR(message, error) {
  return { data: [], error: error || [message], message: message || "Error" };
}

module.exports = {
  MESSAGE_SUCCESS,
  MESSAGE_ERROR
};
