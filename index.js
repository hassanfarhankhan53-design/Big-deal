const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`🔥 Bot Online: ${client.user.tag}`);
});

// 👇 YE CODE YAHI HONA CHAHIYE
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await interaction.deferReply();

    if (interaction.commandName === "ping") {
      await interaction.editReply("🏓 Pong!");
    }

  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);
