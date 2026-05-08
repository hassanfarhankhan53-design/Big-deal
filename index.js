// 🔥 Render/Railway port fix
require("http")
  .createServer((req, res) => res.end("Bot Running"))
  .listen(process.env.PORT || 3000);

const { Client, GatewayIntentBits } = require("discord.js");

// ✅ Discord Client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ✅ Bot Token
const TOKEN = process.env.TOKEN;

// ❌ Token missing check
if (!TOKEN) {
  console.log("❌ TOKEN missing!");
  process.exit(1);
}

// ✅ Bot Online
client.once("ready", () => {
  console.log(`🔥 Bot Online: ${client.user.tag}`);
});

// ✅ Slash Commands Handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    // ⏳ Prevent "did not respond"
    await interaction.deferReply();

    // 🏓 Ping Command
    if (interaction.commandName === "ping") {
      await interaction.editReply("🏓 Pong!");
    }

    // 💰 Balance Command Example
    else if (interaction.commandName === "balance") {
      await interaction.editReply("💰 Your balance is $0");
    }

    // ❓ Unknown Command
    else {
      await interaction.editReply("❓ Unknown command");
    }

  } catch (err) {
    console.error("❌ Error:", err);

    try {
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("❌ Command error");
      } else {
        await interaction.reply("❌ Command error");
      }
    } catch (e) {
      console.error(e);
    }
  }
});

// ✅ Login
client.login(TOKEN);
