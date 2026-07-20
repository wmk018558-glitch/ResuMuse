import type { Conversation, Message, StreamEvent } from "@/types/chat";

// ── Mock Data ──────────────────────────────────────────────

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "优化产品经理简历",
    lastMessage: "我已经优化了你的工作经历部分，重点突出了量化成果...",
    createdAt: "2026-07-19T10:00:00Z",
    updatedAt: "2026-07-20T14:30:00Z",
  },
  {
    id: "conv-2",
    title: "分析字节跳动JD",
    lastMessage: "这份JD的核心要求是：数据分析能力、跨部门协作...",
    createdAt: "2026-07-18T08:00:00Z",
    updatedAt: "2026-07-19T09:00:00Z",
  },
  {
    id: "conv-3",
    title: "面试问题准备",
    lastMessage: "以下是针对该岗位的高频面试问题...",
    createdAt: "2026-07-17T16:00:00Z",
    updatedAt: "2026-07-17T18:00:00Z",
  },
];

const mockMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      role: "user",
      content: "帮我优化简历中的工作经历描述，我目前在腾讯做产品经理",
      createdAt: "2026-07-20T14:00:00Z",
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      role: "assistant",
      content:
        "好的，我来帮你优化。请提供你目前简历中工作经历的具体内容，我会逐条优化，重点突出**量化成果**和**项目影响力**。\n\n同时，你可以参考以下结构来组织工作经历：\n\n1. **项目/产品名称** — 一句话说明\n2. **你的角色与职责**\n3. **关键成果**（带数据）\n4. **使用的技能/工具**",
      createdAt: "2026-07-20T14:01:00Z",
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      role: "user",
      content: "这是我的工作经历：\n- 负责微信小程序电商功能迭代\n- 参与了用户增长策略制定\n- 协调开发、设计团队完成产品上线",
      createdAt: "2026-07-20T14:05:00Z",
    },
    {
      id: "msg-4",
      conversationId: "conv-1",
      role: "assistant",
      content:
        "我已经优化了你的工作经历部分，重点突出了量化成果。以下是优化后的版本：\n\n**腾讯 | 产品经理 | 2022.06 - 至今**\n\n- **微信小程序电商功能迭代**：主导微信小程序电商模块从0到1的产品设计，覆盖**200万+DAU**，上线后GMV环比提升**35%**\n- **用户增长策略**：通过A/B测试优化新用户引导流程，将注册转化率从12%提升至**18%**，季度新增用户突破**50万**\n- **跨团队协作**：协调开发、设计、运营等**4个团队共15人**，保障3个核心版本按期交付，延期率降低至**5%以内**\n\n```markdown\n优化要点：\n✅ 每个条目都加入了量化数据\n✅ 使用「主导」「优化」等高能量动词\n✅ 展示了团队规模和协调能力\n```\n\n需要继续优化其他部分吗？",
      createdAt: "2026-07-20T14:30:00Z",
    },
  ],
  "conv-2": [
    {
      id: "msg-5",
      conversationId: "conv-2",
      role: "user",
      content: "帮我分析字节跳动产品经理JD的核心要求",
      createdAt: "2026-07-19T08:30:00Z",
    },
    {
      id: "msg-6",
      conversationId: "conv-2",
      role: "assistant",
      content:
        "这份JD的核心要求如下：\n\n### 硬技能要求\n| 技能 | 重要度 | 说明 |\n|------|--------|------|\n| 数据分析 | ⭐⭐⭐⭐⭐ | SQL、Excel、Tableau |\n| 产品设计 | ⭐⭐⭐⭐ | PRD撰写、原型设计 |\n| 项目管理 | ⭐⭐⭐ | 敏捷开发流程 |\n\n### 软技能要求\n- **跨部门协作**：需要与研发、设计、运营等多团队配合\n- **用户洞察**：能够通过用户调研挖掘真实需求\n- **结果导向**：有明确的OKR驱动意识\n\n需要我帮你对比你的简历与这份JD的匹配度吗？",
      createdAt: "2026-07-19T09:00:00Z",
    },
  ],
  "conv-3": [
    {
      id: "msg-7",
      conversationId: "conv-3",
      role: "user",
      content: "针对字节跳动产品经理岗位，生成一些可能的面试问题",
      createdAt: "2026-07-17T17:00:00Z",
    },
    {
      id: "msg-8",
      conversationId: "conv-3",
      role: "assistant",
      content:
        "以下是针对该岗位的高频面试问题：\n\n### 产品能力\n1. **请分享一个你从0到1做过的产品** — 关注需求挖掘、MVP定义、迭代过程\n2. **如何确定产品需求的优先级？** — 考察方法论和决策框架\n\n### 数据分析\n3. **DAU下降了15%，你会怎么排查？** — 考察数据驱动思维\n4. **如何设计一个A/B测试来验证新功能？**\n\n### 综合素质\n5. **和研发意见不一致时怎么处理？**\n6. **你觉得字节跳动的产品和其他大厂有什么不同？**\n\n建议你用 **STAR法则** 组织回答。需要我针对某个问题给出示例回答吗？",
      createdAt: "2026-07-17T18:00:00Z",
    },
  ],
};

// ── Helpers ────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ── Mock Response Tokens ───────────────────────────────────

function getMockResponseTokens(userMessage: string): string[] {
  const responses: Record<string, string> = {
    default: `收到你的消息！这是一个模拟的 AI 回复，用于演示流式输出效果。

### 关于你的问题

我正在分析你的需求。在实际部署中，这里会连接到真实的 AI 后端服务。

\`\`\`typescript
// 流式输出示例代码
async function* streamResponse(prompt: string) {
  const tokens = prompt.split(' ');
  for (const token of tokens) {
    yield token + ' ';
    await delay(50);
  }
}
\`\`\`

### 下一步建议

1. 上传你的简历以获得个性化建议
2. 提供具体的岗位JD进行匹配分析
3. 开始模拟面试练习

有什么其他问题吗？`,
  };

  // Simple keyword matching for more relevant mock responses
  if (
    userMessage.includes("简历") ||
    userMessage.includes("resume")
  ) {
    return "好的，我来帮你优化简历。请上传你的简历文件，或者直接粘贴内容，我会从以下几个维度进行分析：\n\n1. **格式与排版** — 是否清晰易读\n2. **内容质量** — 是否有量化成果\n3. **关键词匹配** — 是否符合ATS筛选\n4. **亮点突出** — 核心竞争力是否明显\n\n你可以直接粘贴简历内容，我会逐条给出优化建议。".split(
      /(?<=\S)(?=\s)/,
    );
  }

  if (
    userMessage.includes("JD") ||
    userMessage.includes("岗位") ||
    userMessage.includes("职位")
  ) {
    return "我来分析这份JD的关键要求：\n\n### 核心关键词提取\n\n| 类别 | 关键词 |\n|------|--------|\n| 硬技能 | 数据分析、SQL、产品设计 |\n| 软技能 | 沟通协作、逻辑思维、用户导向 |\n| 经验要求 | 3年以上产品经验、B端经验优先 |\n\n### 匹配建议\n\n- 确保简历中包含以上**高频关键词**\n- 准备相关项目案例来支撑每个关键词\n- 你目前的工作经历与这个岗位匹配度约 **70%**\n\n需要我帮你进一步优化简历以匹配这个岗位吗？".split(
      /(?<=\S)(?=\s)/,
    );
  }

  return responses.default.split(/(?<=\S)(?=\s)/);
}

// ── Public API ─────────────────────────────────────────────

export const chatApi = {
  async getConversations(): Promise<Conversation[]> {
    await delay(200);
    return [...mockConversations].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    await delay(150);
    return mockMessages[conversationId] || [];
  },

  async createConversation(title?: string): Promise<Conversation> {
    await delay(200);
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: title || "新对话",
      lastMessage: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockConversations.unshift(newConv);
    mockMessages[newConv.id] = [];
    return newConv;
  },

  async deleteConversation(id: string): Promise<void> {
    await delay(150);
    const idx = mockConversations.findIndex((c) => c.id === id);
    if (idx !== -1) mockConversations.splice(idx, 1);
    delete mockMessages[id];
  },

  async *streamMessage(
    conversationId: string,
    content: string,
  ): AsyncGenerator<StreamEvent> {
    const tokens = getMockResponseTokens(content);

    for (const token of tokens) {
      await delay(20 + Math.random() * 40);
      yield { type: "token", content: token };
    }

    const messageId = generateId();
    yield { type: "done", messageId };

    // Persist to mock store
    if (mockMessages[conversationId]) {
      const fullContent = tokens.join("");
      mockMessages[conversationId].push({
        id: generateId(),
        conversationId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      });
      mockMessages[conversationId].push({
        id: messageId,
        conversationId,
        role: "assistant",
        content: fullContent,
        createdAt: new Date().toISOString(),
      });
    }
  },
};
