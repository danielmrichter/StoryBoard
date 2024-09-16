function setItemType(cardType) {
  switch (cardType) {
    case "text":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings", "bg_color")
          VALUES
          ($1, $2, '{}', '#FFFFFF');`;
    case "image":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings", "bg_color")
          VALUES
          ($1, $2, '{}','#FFFFFF');`;
    case "title":
      return `
      INSERT INTO "added_cards"
        ("project_id", "card_type", "card_settings", "bg_color")
          VALUES
        ($1, $2, '{"titleText": "title"}', '#a9a9a9');
      `;
    case "tmdb":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings", "bg_color")
          VALUES
          ($1, $2, '{}', '#FFFFFF');
      `;
  }
}

module.exports = setItemType;
