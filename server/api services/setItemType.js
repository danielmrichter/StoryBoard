function setItemType(cardType) {
  switch (cardType) {
    case "text":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings", "bg_color")
          VALUES
          ($1, $2, '{"text": "text"}', '#FFFFFF');`;
    case "image":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings", "bg_color")
          VALUES
          ($1, $2, '{"img_url": "https://pyxis.nymag.com/v1/imgs/09c/923/65324bb3906b6865f904a72f8f8a908541-16-spongebob-explainer.2x.rhorizontal.w700.jpg"}', '#FFFFFF');`;
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
         ("project_id", "card_type", "card_settings", "card_header", "bg_color")
          VALUES
          ($1, $2, '{}', 'TMDB Card', '#FFFFFF');
      `;
  }
}

module.exports = setItemType;
