"use client";

import { useEffect, useState } from "react";
import { ClosetRow } from "@/modules/closet/type";
import { fetchClothes, insertClothes } from "@/modules/closet/api";

export default function TestSubasePage() {
  const [rows, setRows] = useState<ClosetRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchRows = async () => {
    const { data, error } = await fetchClothes();

    if (error) {
      console.log(error);
      setError(error.message);
      return;
    }
    setRows(data ?? []);
  };
  useEffect(() => {
    fetchRows();
  }, []);

  const createClosetItem = async () => {
    if (!season.trim() || !category.trim() || !color.trim()) {
      setError("계절/카테고리/색상을 모두 입력해주세요.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await insertClothes({
        season: season.trim(),
        color: color.trim(),
        category: category.trim(),
      });

      if (error) {
        setError(error.message);
        return;
      }

      // 초기화
      setSeason("");
      setCategory("");
      setColor("");

      await fetchRows();
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
      <h1>Supabase Test</h1>
      {error && <p className="mb-3 text-red-600">{error}</p>}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createClosetItem();
          }}
          className="border rounded p-4 mb-6 space-y-3"
        >
          <div className="flex items-center gap-3">
            <strong className="w-20">계절</strong>
            <input
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              type="text"
              className="border border-solid px-3 py-2 rounded flex-1"
              placeholder="예) spring"
            />
          </div>
          <div className="flex items-center gap-3">
            <strong className="w-20">카테고리</strong>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="border border-solid px-3 py-2 rounded flex-1"
              placeholder="예) top"
            />
          </div>

          <div className="flex items-center gap-3">
            <strong className="w-20">색상</strong>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              className="border border-solid px-3 py-2 rounded flex-1"
              placeholder="예) black"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-500 px-4 py-2 text-white rounded disabled:opacity-60"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </form>
      </div>
      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
}
