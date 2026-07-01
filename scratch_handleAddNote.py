import sys

file_path = 'frontend/src/app/(dashboard)/startups/[id]/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

func_code = """
  const handleAddNote = async () => {
    if (!newNoteContent.trim()) return;
    try {
      const res = await apiFetch(`/api/meetings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startup_id: Number(id),
          meeting_type: noteType,
          ai_summary: newNoteContent,
          duration_minutes: 0,
          raw_transcript: "",
          key_concerns: "",
          action_items: [],
          founder_score: 0,
          live_mode_used: false
        })
      });
      // Refresh history
      const historyData = await apiFetch(`/api/startups/${id}/history`);
      if (historyData) setHistory(historyData);
      setNewNoteContent("");
    } catch (e) {
      console.error(e);
      alert("Error adding note");
    }
  };
"""

insert_idx = content.find('const handleDeleteFounder')
if insert_idx == -1:
    insert_idx = content.find('useEffect(() => {')

if insert_idx == -1:
    print('Failed to find insertion point')
    sys.exit(1)

new_content = content[:insert_idx] + func_code + content[insert_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Success')
