function setItemType(cardType) {
  switch (cardType) {
    case "text":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings")
          VALUES
          ($1, $2, '{"text": "text"}');`;
    case "image":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings")
          VALUES
          ($1, $2, '{"img_url": "https://pyxis.nymag.com/v1/imgs/09c/923/65324bb3906b6865f904a72f8f8a908541-16-spongebob-explainer.2x.rhorizontal.w700.jpg"}');`;
    case "title":
      return `
      INSERT INTO "added_cards"
        ("project_id", "card_type", "card_settings")
          VALUES
        ($1, $2, '{"text": "text"}');
      `;
    case "tmdb":
      return `
      INSERT INTO "added_cards"
         ("project_id", "card_type", "card_settings", "card_header")
          VALUES
          ($1, $2, '{}', 'TMDB Card');
      `;
  }
}

module.exports = setItemType;
